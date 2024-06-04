"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const openai = new openai_1.default();
const mustSing_tools = [
    {
        "type": "function",
        "function": {
            "name": "compute_qualifies",
            "description": "Determines if a person qualifies for the purposes of the rule. The input object describes the person's properties in the primary parameters: walks, eats, drinks. Secondary parameters can be given which are sufficient to determine some of the primary parameters. A person drinks whether or not they consume an alcoholic or a non-alcoholic beverage, in part or in whole; those specific details don't really matter. The output of the function can be either a request for required information; a restatement of the user input requesting confirmation prior to function calling; or a Boolean answer with optional explanation summary.",
            "parameters": {
                "type": "object",
                "properties": {
                    "walks": {
                        "type": "string", "enum": ["true", "false", "unknown"],
                        "description": "Did the person walk?",
                    },
                    "eats": {
                        "type": "string", "enum": ["true", "false", "unknown"],
                        "description": "Did the person eat?",
                    },
                    "drinks": {
                        "type": "string", "enum": ["true", "false", "unknown"],
                        "description": "Did the person drink?",
                    },
                    "beverage type": {
                        "type": "string", "enum": ["alcoholic", "non-alcoholic", "unknown"],
                        "description": "Did the person drink an alcoholic beverage?",
                    },
                    "in whole": {
                        "type": "string", "enum": ["true", "false", "unknown"],
                        "description": "Did the person drink all of the beverage?",
                    },
                },
                "required": ["walks"],
            }
        }
    }
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.chat.completions.create({
            messages: [
                { role: "system", content: "You are a helpful assistant. Some queries will require calling an external function. Importantly, don't make assumptions about what values to plug into functions! Ask for clarification if a user request does not give sufficient data. After the facts have been collected, do not attempt to reason through the logic; instead, always call the function to evaluate the logic and obtain an answer. When delivering the final answer to the user, give a detailed explanation." },
                { role: "user", content: "Hi! Help me determine if a person qualifies." },
                //    "tool_calls": [
                //      {
                //        "id": "call_vGRgaHXRNOZFleAsnDDLupz4",
                //        "type": "function",
                //        "function": {
                //          "name": "compute_qualifies",
                //          "arguments": "{\"walks\":\"unknown\"}"
                //        }
                //      }
                { role: "function", name: "compute_qualifies", content: "require (walks AND (eats OR drinks))" },
                { role: "assistant", content: "I need some additional information to determine if the person qualifies. Could you please provide the following details:\n\n1. Did the person walk? (true/false/unknown)\n2. Did the person eat? (true/false/unknown)\n3. Did the person drink? (true/false/unknown)" },
                { role: "user", content: "I know they did not walk." },
                { role: "assistant", content: "Thank you for that information. \n\nCan you confirm if the person ate? (true/false/unknown)" },
                // wrong! should be asking if the person ate or drank.
                { role: "user", content: "I don't know if they ate. I know they drank a beverage but I don't know if it was alcoholic or not." },
                // erroneously? assumes that drinks is unknown
                // "tool_calls": [
                //  {
                //   "id": "call_ESrpjH31an3PZMqmZws0uo15",
                //   "type": "function",
                //   "function": {
                //    "name": "compute_qualifies",
                //    "arguments": "{\"walks\":\"false\",\"eats\":\"unknown\",\"drinks\":\"unknown\"}"
                //   }
                //  }
                // ]
                // { role: "function", 
                // 	name: "compute_qualifies",
                // 	arguments: "{\"walks\":\"false\",\"drinks\":\"true\",\"beverage type\":\"unknown\"}"
                // },
                { role: "function", name: "compute_qualifies", content: "{ \"restatement\": {\"walks\":\"false\",\"drinks\":\"true\",\"eats\":\"false\"} }" },
                {
                    role: "assistant",
                    content: "Based on the information you've provided:\n- The person did not walk.\n- It's unknown if the person ate.\n- The person drank a beverage, but it is uncertain whether it was alcoholic or not.\n\nLet's confirm with the following statement before I proceed with determining if the person qualifies: \nThe person did not walk, they drank a beverage, and we don't know if they ate. Is this correct?"
                },
                { role: "user", content: "Yes, those facts are correct." },
                //   "tool_calls": [
                //    {
                //     "id": "call_wpQ7TSWBEcvgEFn5sdq8IuYm",
                //     "type": "function",
                //     "function": {
                //      "name": "compute_qualifies",
                //      "arguments": "{\n\"walks\": \"false\",\n\"eats\": \"unknown\",\n\"drinks\": \"true\"\n}"
                //     }
                //    }
                // THIS IS THE LAG PART
                // the rule engine runs logic in a defensible, auditable, transparent way to return the top-level answer.
                // the LLM then generates an explanation guided by the logic engine.
                { role: "function", name: "compute_qualifies", content: "{ \"answer\": \"false\", \"explanation\": { \"necessary(walks)\" } }" },
            ],
            model: "gpt-4o",
            tools: mustSing_tools,
        });
        console.log(JSON.stringify(completion.choices[0], null, 1));
    });
}
main();
