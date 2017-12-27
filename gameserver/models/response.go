package models

import (
	"github.com/satori/go.uuid"
	"github.com/aws/aws-sdk-go/service/dynamodb"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/fatih/structs"

	"fmt"
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
	Round int `json:round`
	Winner string `json:"winner"`
	Summaries []FightSummary `json:"summary"`
	Logs []ActionLog `json:"logs,omitempty"`
	Message string `json:"message"`
	TotalSpan int `json:"totalSpan"`
}

type FightSummary struct {
	BotCode string `json:"botCode"`
	Team int `json:"team"`
	PointPercentage float32 `json:"pointPercentage"`
}

type ActionLog struct {
	Team int `json:"team"`
	BotCode string `json:"botCode"`
	ActionCode string `json:"actionCode"`
	Params map[string]string `json:"params"`
	Span int `json:"span"`
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

func (*r Response)SaveAsResultToDB() error {
	svc := dynamodb.New(session.New())
	id := fmt.Sprint(uuid.NewV4())

	r.resultId = id

	t, err := time.Now()
	if err != nil{
		log.Fatal(err)
		return err
	}
	input := &dynamodb.PutItemInput{
	    Item: map[string]*dynamodb.AttributeValue{
	        "id": {
	            S: aws.String(id),
	        },
	        "gameName": {
	            S: aws.String(r.Config.GameName),
	        },
	        "rule": {
	            S: aws.String(r.Config.Rule),
	        },
	        "filter": {
	            S: aws.String(r.Config.Filter),
	        },
	        "status": {
	            S: aws.String("Finished"),
	        },
	        "numOfFights": {
	            N: aws.Int(len(r.Fights)),
	        },
	        "Fights": {
	            M: r.ConvertFights(),
	        },
	        "bots": {
	            M: r.BotSummaries(),
	        },
	        "createdAt": {
	            S: aws.String(fmt.Sprint(t)),
	        },
	        "updatedAt": {
	            S: aws.String(fmt.Sprint(t)),
	        },
	    },
	    ReturnConsumedCapacity: aws.String("TOTAL"),
	    TableName:              aws.String("Results"),
	}

	result, err := svc.PutItem(input)
	if err != nil {
	    if aerr, ok := err.(awserr.Error); ok {
	        switch aerr.Code() {
	        case dynamodb.ErrCodeConditionalCheckFailedException:
	            fmt.Println(dynamodb.ErrCodeConditionalCheckFailedException, aerr.Error())
	        case dynamodb.ErrCodeProvisionedThroughputExceededException:
	            fmt.Println(dynamodb.ErrCodeProvisionedThroughputExceededException, aerr.Error())
	        case dynamodb.ErrCodeResourceNotFoundException:
	            fmt.Println(dynamodb.ErrCodeResourceNotFoundException, aerr.Error())
	        case dynamodb.ErrCodeItemCollectionSizeLimitExceededException:
	            fmt.Println(dynamodb.ErrCodeItemCollectionSizeLimitExceededException, aerr.Error())
	        case dynamodb.ErrCodeInternalServerError:
	            fmt.Println(dynamodb.ErrCodeInternalServerError, aerr.Error())
	        default:
	            fmt.Println(aerr.Error())
	        }
	    } else {
	        // Print the error, cast err to awserr.Error to get the Code and
	        // Message from an error.
	        fmt.Println(err.Error())
	    }
	    return err
	}

	fmt.Println(result)
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
		}
	}
}

func (r *Response)BotSummaries() []map[string]string {
	ret := []map[string]string{}
	for b := range r.Bots {
		bot := map[string]string{
			"name": b.Name,
			"username": b.Username,
		}
		ret = append(ret, bot)
	}
	return ret
}

func (r *Response)ConvertFights() []map[string]interface{} {
	resp := []map[string]interface{}
	for f := range r.Fights {
		resp = append(resp, structs.New(f).Map())
	}
	return resp
}

func (r *Response)ClearLogs() {
	for f := range r.Fights {
		f.Logs = nil
	}
}

func (r *Response) ClearFights() {
		r.Fights = nil
}
