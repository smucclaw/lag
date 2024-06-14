
import * as tsm from 'sect10-typescript/src/mathlang';
import { setup, exprReduce, myshow, Qualifies, Drinks, extendRecord } from './generated';

const mengs_output = { "index":0
, "message":
    { "role":"assistant"
    , "content":null
    , "tool_calls":
        [
            { "id":"call_SSrGnyCScXJLqOMP5dgHAL8F"
            , "type":"function"
            , "function":
                { "name":"compute_qualifies"
                , "arguments": {
                    "walks": "true",
                    "eats": "false",
                    "drinks": "unknown",
                    "beverage type": "non-alcoholic",
                    "in whole": "true"
                    }
                }
            }
        ]
    }
, "logprobs":null
, "finish_reason":"tool_calls"
}

function get_values(input: any) {
    return input["message"]["tool_calls"][0]["function"]["arguments"];
}


// This is copied and simplified from usecases/sect10-typescript/crunch.ts
// Maybe there's a better place for it???
function go(user_input:any) {
    setup(user_input); // modifies global variable tsm.symTab

    // evaluating Drinks gives us new values in a dictionary
    const drinks = Drinks()
    const asDict = exprReduce(drinks)

    // we extend the symtab (of user inputs) with the newly evaluated Drinks
    extendRecord(tsm.symTab, {...asDict})

    // with the value of "drinks" coming from Drinks(), we can now evaluate Qualifies
    const expr = Qualifies()


    // const exprval = asDict.testPoint ? asDict.testPoint : expr.val
    console.log("The whole expression evaluates to:", expr.val, "\n\n")

    myshow(expr)

    console.log("** reduced expr as dict")
    console.log (`#+BEGIN_SRC js`)
    console.log(JSON.stringify(exprReduce(expr), null, 2))
    console.log (`#+END_SRC`)
}

go(get_values(mengs_output))
