package models

import (
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/aws/credentials"

	"github.com/satori/go.uuid"
	"github.com/guregu/dynamo"

	"fmt"
	"log"
	"time"
)

type Response struct {
	resultId string `json:"-"`
	Success bool `json:"success,string"`
	Bots []Bot `json:"bots"`
	Config *GameConfig `json:"config"`
	Fights []Fight `json:"fights,omitempty"`
	Error *Err `json:"error"`
}

type Fight struct {
	Round int `json:"round"	dynamo:"round"`
	Winner string `json:"winner" dynamo:"winner"`
	Summaries []FightSummary `json:"summary" dynamo:"summaries"`
	Logs []ActionLog `json:"logs,omitempty" dynamo:"logs,omitempty"`
	Message string `json:"message" dynamo:"messages"`
	TotalSpan int `json:"totalSpan" dynamo:"totalSpan"`
}

type FightSummary struct {
	BotCode string `json:"botCode" dynamo:"botCode"`
	Team int `json:"team" dynamo:"team"`
	PointPercentage float32 `json:"pointPercentage" dynamo:"pointPercentage"`
}

type ActionLog struct {
	Team int `json:"team" dynamo:"team"`
	BotCode string `json:"botCode" dynamo:"botCode"`
	ActionCode string `json:"actionCode" dynamo:"actionCode"`
	Params map[string]string `json:"params" dynamo:"params"`
	Span int `json:"span" dynamo:"span"`
}

type Err struct {
	At string `json:"at"`
	Message string `json:message`
}

type Result struct {
	Success bool `json:"success"`
	ResultId string `json:"resultId,omitempty"`
	Error *Err `json:"error,omitempty"`
}

type Dynamo struct {
	Id string `dynamo:"id"`
	GameName string `dynamo:"gameName"`
	Rule string `dynamo:"rule"`
	Filter string `dynamo:"filter"`
	NumOfFights int `dynamo:"numOfFights"`
	Bots []map[string]string `dynamo:"bots"`
	Fights []Fight `dynamo:"fights,omitempty"`
	UpdatedAt time.Time `dynamo:"updatedAt"`
	CreatedAt time.Time `dynamo:"createdAt"`
}

func (r *Response)SaveAsResultToDB() error {

	db := dynamo.New(session.New(), &aws.Config{
		Credentials: credentials.NewEnvCredentials(),
		Region: aws.String("us-east-1"),
	})
	table := db.Table("Results")
	r.resultId = fmt.Sprint(uuid.NewV4())
	data := r.getDynamo()

	err := table.Put(data).Run()

	if err != nil {
	    if aerr, ok := err.(awserr.Error); ok {
	        switch aerr.Code() {
	        case dynamodb.ErrCodeConditionalCheckFailedException:
	            log.Println(dynamodb.ErrCodeConditionalCheckFailedException, aerr.Error())
	        case dynamodb.ErrCodeProvisionedThroughputExceededException:
	            log.Println(dynamodb.ErrCodeProvisionedThroughputExceededException, aerr.Error())
	        case dynamodb.ErrCodeResourceNotFoundException:
	            log.Println(dynamodb.ErrCodeResourceNotFoundException, aerr.Error())
	        case dynamodb.ErrCodeItemCollectionSizeLimitExceededException:
	            log.Println(dynamodb.ErrCodeItemCollectionSizeLimitExceededException, aerr.Error())
	        case dynamodb.ErrCodeInternalServerError:
	            log.Println(dynamodb.ErrCodeInternalServerError, aerr.Error())
	        default:
	            log.Println(aerr.Error())
	        }
	    } else {
	        // Print the error, cast err to awserr.Error to get the Code and
	        // Message from an error.
	        log.Println(err.Error())
	    }
	    return err
	}
	return nil
}


func (r *Response)GetResult() *Result {
	var err *Err
	if r.Success {
		err = nil
	}else {
		err = r.Error
	}
	return &Result{
		Success: r.Success,
		ResultId: r.resultId,
		Error: err,
	}
}

func (r *Response)GetErrorResult(at, msg string) *Result {
	return &Result{
		Success: false,
		Error: &Err{
			At: at,
			Message: msg,
		},
	}
}

func (r *Response)ClearLogs() {
	for _, f := range r.Fights {
		f.Logs = nil
	}
}

func (r *Response) ClearFights() {
		r.Fights = nil
}

func (r *Response)getDynamo() *Dynamo {
	t := time.Now()
	return &Dynamo{
		Id: r.resultId,
		GameName: r.Config.GameName,
		Rule: r.Config.Rule,
		Filter: r.Config.Filter,
		NumOfFights: r.Config.NumOfFights,
		Bots: r.getBotSummaries(),
		Fights: r.Fights,
		UpdatedAt: t,
		CreatedAt: t,
	}
}

func (r *Response)getBotSummaries() []map[string]string {
	ret := []map[string]string{}
	for _, b := range r.Bots {
		bot := map[string]string{
			"name": b.Name,
			"username": b.Username,
		}
		ret = append(ret, bot)
	}
	return ret
}
