import json

def main():
    print("Input event file name: ")
    file = input()
    f = open('./sam/test/events/'+file, 'r')

    try:
        json_data = json.load(f)
        print(json_data)
    except Exception as e:
        print(e.__doc__)
        print()
        print(e.msg)
        print()
        print(e.doc)

if __name__=='__main__':
    main()
