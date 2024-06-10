# LAG: Logic Augmented Generation

*a reasoner and explanation engine backend for LLM-based AI applications*

This repository explains the motivation for LAG and aims to offer a
working prototype demonstrating integration with ChatGPT, Llama, Groq,
and with the L4 rule engine API in the backend.

## History

The first known use of the term "Logic-Augmented Generation" can be
dated to April 3, 2024, in [a post on Bill French's
Substack](https://impertinent.substack.com/p/lag-logic-augmented-generation).

## About LAG

Logic-Augmented Generation complements LLMs generally and
Retrieval-Augmented Generation (RAG) specifically.

RAG provides text and other content to serve as context for a given
conversation. The basic idea behind RAG is to focus attention on
several kilobytes or megabytes of foreground content "on the table",
laid atop the several gigabytes or terabytes of background material
that serve as the foundation for the LLM AI.

Logic-Augmented Generation adds formal reasoning capabilities, such as
deductive and abductive reasoning, to the AI mix.

LAG is intended to help counter hallucinations; better make sense of
RAG content; and answer queries with greater detail, correctness, and
confidence.

The relationship between RAG and LAG finds analogy in the metaphor of
left-brain vs right-brain, or perhaps the "System 1 / System 2"
dichotomy popularized in Daniel Kahneman's *Thinking, Fast and Slow*.

Together, LLMs, RAG, and LAG systems deliver the paradigm of "[neuro-symbolic AI](https://en.wikipedia.org/wiki/Neuro-symbolic_AI)".

While chain-of-thought prompting and other techniques may be used to
persuade LLM AIs to think as logically as they possibly can, a
fundamentally different architecture -- symbolic, rather than neural
-- is required for structured reasoning in high-stakes domains to do with law,
contracts, and money.

## Context: Application Background and Pain Points

We consider a scenario in which an existing third-party chatbot app
requires detailed reasoning beyond its current capabilities.

The chatbot might have been developed using ChatGPT or Llama or Gemini
or Claude or similar.

For example, the chatbot app might have been trained/prompt-engineered
to specialize in a domain such as insurance.

It might be able to answer questions about insurance generally:

---

<details>
    <summary>
    Teach me about insurance policies generally, and personal accident death & disability policies specifically.
    </summary>

> ([source: ChatGPT conversation with ChatGPT 4 on 2024-06-01](https://chatgpt.com/share/32e57d0b-9e86-4772-ba56-b49d4928f497))
> 
> Insurance policies are agreements where an insurance company provides financial protection or reimbursement to an individual (the policyholder) against losses from specific events in exchange for a premium (a periodic payment). These policies are vital in managing risk and providing financial security.
> 
> ### General Types of Insurance Policies
> 
> 1. **Health Insurance**: Covers medical expenses for illnesses, injuries, and other health conditions.
> 2. **Life Insurance**: Provides financial benefits to a deceased person's beneficiaries.
> 3. **Auto Insurance**: Covers damages to a vehicle and liabilities from accidents.
> 4. **Homeowners/Renters Insurance**: Protects against damage to residences and their contents.
> 5. **Travel Insurance**: Covers cancellations, medical expenses abroad, and other travel-related losses.
> 6. **Liability Insurance**: Protects against legal and financial liabilities resulting from injuries to other people or damage to their property.
> 
> ### Personal Accident Death & Disability Insurance
> 
> This specific type of insurance provides coverage for the insured in the event of death or disability due to an accident. Here are key aspects of this policy:
> 
> - **Coverage**: It typically includes death, permanent total disability, and sometimes temporary disabilities. The definitions of these terms can vary significantly between policies.
>   
> - **Benefit Payouts**: In the event of an accident leading to the insured's death, the policy pays out a lump sum to the beneficiaries. In cases of disability, the policy might pay out depending on the severity and type of disability (e.g., loss of limbs or eyesight).
> 
> - **Scope of Coverage**: These policies can cover accidents occurring worldwide and are usually in effect 24/7. Some policies might exclude specific activities deemed high risk, like extreme sports.
> 
> - **Exclusions**: Common exclusions might include accidents resulting from drug or alcohol use, self-inflicted injuries, and pre-existing conditions.
> 
> - **Cost and Duration**: Premiums depend on several factors, including the policyholder's age, lifestyle, job risk, and the coverage scope. Policies might be available on a term basis (covering a specified period) or as a lifetime coverage.
> 
> - **Claim Process**: In the event of an accident, the claim process involves submitting proof of the accident (like a medical report or police report) and evidence of the resulting death or disability. Insurers may require a detailed medical examination to verify claims of disability.
> 
> Choosing the right insurance policy involves assessing one's personal needs, financial situation, and understanding the terms and conditions of the policy. It's advisable to compare different products and consult with an insurance professional to find the best fit.

</details>

---

Thanks to RAG, it may be able to answer questions about one or more
specific policy contracts.

---

<details>
    <summary>
    Let's talk about https://www.manulife.com.sg/content/dam/insurance/sg/insurance-guides/accidental-death-coverage.pdf
    </summary>

> (source: groq.com conversation with Llama3-8b-8192 on 2024-06-01)
> 
> The Accidental Death Coverage guide from Manulife Singapore!
> 
> This guide provides a comprehensive overview of Accidental Death Coverage, which is a type of insurance that pays a lump-sum benefit to the beneficiary in the event of the insured's death due to an accident.
> 
> Here are some key points from the guide:
> 
> **What is Accidental Death Coverage?**
> 
> Accidental Death Coverage is a type of insurance that provides a lump-sum benefit to the beneficiary in the event of the insured's death due to an accident. The benefit is paid regardless of the cause of death, as long as it is an accident.
> 
> **Key Features:**
> 
> 1. **Accidental Death Benefit**: A lump-sum payment made to the beneficiary in the event of the insured's death due to an accident.
> 2. **Accident Definition**: The policy defines what constitutes an accident, such as a sudden and unexpected event that results in injury or death.
> 3. **Exclusions**: The policy may exclude certain types of accidents or injuries, such as those caused by war, terrorism, or intentional self-harm.
> 4. **Waiting Period**: The policy may have a waiting period before coverage becomes effective, typically ranging from 14 to 30 days.
> 5. **Benefit Period**: The policy may have a benefit period, which is the length of time that benefits are paid out, typically ranging from 2 to 5 years.
> 
> **Benefits:**
> 
> 1. **Financial Protection**: Provides financial protection for the insured's dependents in the event of their death.
> 2. **Peace of Mind**: Provides peace of mind for the insured and their loved ones, knowing that they are protected in the event of an accident.
> 
> **Who Should Consider Accidental Death Coverage?**
> 
> 1. **High-Risk Occupations**: Individuals working in high-risk occupations, such as construction, manufacturing, or transportation.
> 2. **Adventure Seekers**: Individuals who engage in high-risk hobbies or activities, such as extreme sports or traveling to high-risk areas.
> 3. **Business Owners**: Business owners who rely on their income to support their families and want to ensure that their loved ones are protected in the event of their death.
> 
> **How to Apply:**
> 
> 1. **Application**: Fill out the application form and provide required documents, such as identification and proof of income.
> 2. **Premium Payment**: Pay the premium amount, which is typically paid annually or monthly.
> 3. **Policy Issuance**: Receive the policy document and certificate of insurance.
> 
> **Conclusion:**
> 
> Accidental Death Coverage provides financial protection for individuals who are at risk of suffering a serious injury or death due to an accident. This type of insurance can provide peace of mind and financial security for the insured and their loved ones.
</details>

---

The general pattern of an insurance coverage query looks like this:

  - As a holder of policy `PolContract`,
  - if I got into an accident on date `AccDate`, 
  - under specific circumstances `Circ`,
  - after having previously renewed my policy on occasions `RenewalDates = [RD1, RD2, RD3]`
  - and suffered injuries `Injuries = [I1, I2, I3]`
  - and sought treatment with `MedicalCare = [ { CareDate: Date, Amount: Money, Vendor: Name }, ... ]`
  - *Question 1*: what expense reimbursement payout am I entitled to?
  - *Question 2*: what accidental death or disability payout am I entitled to?
  - Give specific details of how the payouts are calculated and why
    specific components are include or excluded based on qualifying
    conditions associated with the specific circumstances of the
    accident.
  - Link to relevant supporting statements in the policy contract.

Current-generation chatbots based on LLMs are not capable of answering
such questions with confidence and detail. See [Insurance Conversation
1](./conversation1.md) for an actual chatbot conversation containing
errors.

As of 2024, improving the logical performance "from within" is an
active area of research. The reasoning shown in GPT4 is an impressive
improvement over that shown in GPT3.5. Is it possible that future
generations of LLMs will become capable of purely logical reasoning
using the current architecture? Yes -- but unlikely, according to
experts, who suggest that a "systems of experts" architecture, and
function calls to externals plugins, may be needed to achieve desired
accurancy.

Accordingly, the LAG approach says, "we need to hedge those bets;
let's put up some guardrails around the LLM and build some cold iron
to do the hard thinking in black and white, to produce answers that we
stand behind."

The LAG approach adds these components:

- a formal representation of the "business logic" -- which may be grounded in legislative, regulative, or contractual rules
- a reasoning engine with rigorous semantics capable of answering deductive and abductive queries
- engineering glue to connect the pieces

These components increase the logical rigour of a chatbot conversation
to the maximum mathematically possible.

If areas of vagueness or ambiguity remain in the source material, the
process of logical reasoning will at least uncover them and make them
explicit to all parties concerned.


``` mermaid
graph TB
    subgraph LLM ["LLM e.g. GPT"]
       LLM1["Parsing and\nFunction Calling\ninterface"]
       LLM3["Rule Transformer\nfrom natural language\nto L4"]
       LLM2["Explanation Renderer"]
    end
    subgraph FrontEnd ["Frontend"]
      EU1["End User"]--"converses with"-->CB1["Chatbot UI"]
      CB1--"elicits"-->F
      CB2["Chatbot UI"]--"answers"-->EU2["End User"]
    end
    
    F["User Input"]--"extracted by"-->LLM1
    LLM1--"produces"-->SD

    subgraph IL ["LAG Interface Layer"]
        SD["Structured User Input\n(JSON)"]
        SR["Structured Response\ncontaining\nexplanation\n(JSON)"]
    end

    SD--"fed to"-->LAG

    subgraph RI ["Rule Ingestion Phase (offline)"]
       ER["Existing Legal or\nBusiness Rules"]--"spidered by"-->RB["LAG Rule Builder"]
    end
    RB--"employs"-->LLM3
    LLM3--"produces"-->BOK

    subgraph LAGRuntime ["LAG Decision Service"]
      BOK["Formalized Rules\n(L4)"]--"consulted by"-->LAG
      LAG["LAG Rule Execution Engine\napplies formalized rules\nto user input,\nproducing answers\ntogether with\nexplanations"]
    end

    LAG--"returns"-->SR
    SR--"dressed up by"-->LLM2
    LLM2--"returns high-quality\nexplanation to"-->CB2
```

## Context: Function Calling a Logic-Augmented-Generation API

The prototype software in this repo augments a chatbot conversation
with logic.

The conversation is mined using LLM and key terms are extracted. Those
terms are passed to the logic engine's rule API in JSON format.

The logic engine's preferred data model schema is provided to the LLM
for output conformance.

``` mermaid
graph LR
    A["End-User"]--"natural language"-->B["Web/Mobile App Front-End"]
    B--"REST API"-->C["UI API service"]
    C--"LLM API"-->D["LLM server"]
    C--"LAG API"-->E["LAG Rule Engine Server"]
```

Alternatively, the native function calling API could make the call:

``` mermaid
graph LR
    A["End-User"]--"natural language"-->B["Web/Mobile App Front-End"]
    B--"REST API"-->C["UI API service"]
    C--"LLM API"-->D["LLM server"]
    D--"function calling\nLAG API"-->E["LAG Rule Engine Server"]
```


### API Architecture History

By default, the chatbot application typically hands off queries to a pre-trained, prompt-engineered LLM.

``` mermaid
sequenceDiagram
    actor A as End-User
    participant B as Web/Mobile App Front-End
    participant C as UI API service
    participant D as LLM server

    A->>B: Teach me about insurance
    B->>C: { session: 42, request: "Teach me about insurance" }
    C->>D: {"role": "system", "content": "You are a helpful assistant. The conversation should focus on insurance policies."}<br/>{"role": "user", "content": "Teach me about insurance" }

    D->>C: {"role": "assistant", "content": "Insurance policies are agreements where..." }
    C->>B: { session: 42, response: "Insurance policies are agreements where..." }
    B->>A: Insurance policies are agreements where...
```

The LAG rule engine API expects input structured in JSON, obeying a schema appropriate to the rulebase.

In this example the rulebase operates against an event with a date and name, and an array of circumstances, each of which can be true or false.

<details>
<summary>JSON Schema</summary>

``` json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "eventDate": {
      "type": "string",
      "format": "date"  // Ensures the date is in YYYY-MM-DD format
    },
    "eventName": {
      "type": "string"
    },
    "circumstances": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "circ": {
            "type": "string"
          },
          "val": {
            "type": "boolean"
          }
        },
        "required": ["circ", "val"],
        "additionalProperties": false
      }
    }
  },
  "required": ["eventDate", "eventName", "circumstances"],
  "additionalProperties": false
}
```
</details>

The LLM server is instructed to extract the relevant terms from free-text end-user input. In the absence of native capabilities for JSON structuring, a possible system prompt could backfill that functionality:

``` json
    {"role": "system",
     "content": "Extract from user input a JSON representation of key facts conforming to the given JSON schema. If a fact is not found in the input, omit it from the JSON output."
     }
```

``` mermaid
sequenceDiagram
    actor A as End-User
    participant B as Web/Mobile App Front-End
    participant C as UI API service
    participant D as LLM server
    participant E as LAG Rule Engine

    A->>B: So I was skydiving on April Fool's and unfortunately died. I was doing this as part of a military exercise overseas. I happen to be a full-time NSman and was acting as a skydiving instructor. What does my insurance policy pay out?
    B->>C: { session: 42, request: "So I was skydiving ..." }
    C->>D: {"role": "system", "content": "Extract from user input a JSON representation of key facts conforming to the following JSON schema. If a fact is not found in the input, omit it from the JSON output." }

    D->>C: {"role": "assistant", "content": "{ eventDate: "2024-04-01", eventName: "skydiving death", circumstances: ... }
    C->>E: {"goal": "payout total", "facts": { eventDate: "2024-04-01", eventName: "skydiving death", circumstances: ... }

    E->>C: {"answer": "insufficient input", pleaseAskFor: [ "medicalVisitFees",... ] }

    C->>D: {"role": "system", "content": "Please translate this API response to a user-friendly text, according to the following rubric: medicalVisitFees = fees related to a medical visit, ..." }
    
    D->>C: {"role": "assistant", "content": "Before we can answer your question in detail, we just need to get a little more information..." }
    
    C->>B: { session: 42, response: "Before we can answer your question in detail, we just need to get a little more information..." }

    B->>A: Before we can answer your question in detail, we just need to get a little more information...
```
For more details on how to constrain output to JSON format, see the following:

https://www.reddit.com/r/LocalLLaMA/comments/17a4zlf/reliable_ways_to_get_structured_output_from_llms/

Equivalently, some LLMs are capable of a [function calling](https://platform.openai.com/docs/guides/function-calling) interface, which serves essentially the same purpose as the above. See the [OpenAI Cookbook](https://cookbook.openai.com/examples/how_to_call_functions_with_chat_models).


## success criteria for demo 1

- system relies on LLM to extract output from free text conversation in some structured format, e.g. JSON or something obeying a grammar
- system feeds the extracted format to the rule engine API, in deductive mode, with a desired goal in mind
- the rule engine API responds with a structured response, being one of
  - insufficient data to decide about goal; please ask for the following variables: `[v1, v2, ... vN]`
  - decision answer; basis for reasoning; citations to original source text
- system passes the response to LLM, instructing transformation to a natural language explanation, with context of previous user conversation.

We assume we already have:
- some ruleset that has been encoded in L4 or in MathLang
- a data model for the desired inputs (and outputs)

We need to build an API server/service that, given inputs from the client, performs the computation and returns a result.

Sometimes the answer is "insufficient data".

### Skydiving Example

For example, the input fact database could be:

- I got injured in a sky-diving accident two weeks ago while overseas on a military trip as part of full-time NS.
- As you know the customer has a Plan A ($200,000) and has renewed 5 times without making any claims.

The goal:

- How much do I get paid?

The answer:

- $230,000, because you were
  - doing skydiving
  - as NS
  - not as an instructor
  - which is addressed in paragraph 6(f)
  - and you originally had a $200,000 policy
  - which is boosted by $30,000
  - because you renewed your policy with us 3 times at 5% per year.

### Must-Sing Example

The ruleset could be:
- Every person who walks, and eats or drinks, must sing.

The input fact database could be:
- I drink.
- I don't walk.

The goal:
- Must I sing?

The answer:
- No, because you don't walk.

### Interface Schema

The following schema is suitable for ChatGPT function-calling:

``` json
tools = [
    {
        "type": "function",
        "function": {
            "name": "compute_qualifies",
            "description": "Determine if a person qualifies for the purposes of the rule about singing. The input object describes the person's properties: walks, eats, drinks. It is given that a person drinks whether or not they consume an alcoholic or a non-alcoholic beverage, in part or in whole, so those specific details don't really matter.",
            "parameters": {
                "type": "object",
                "properties": {
                    "walks": {
                        "type": "boolean",
                        "description": "Did the person walk?",
                    },
                    "eats": {
                        "type": "boolean",
                        "description": "Did the person eat?",
                    },
                    "drinks": {
                        "type": "boolean",
                        "description": "Did the person drink?",
                    },
                    "an alcoholic": {
                        "type": "boolean",
                        "description": "Did the person drink an alcoholic beverage?",
                    },
                    "a non-alcoholic": {
                        "type": "boolean",
                        "description": "Did the person drink a non-alcoholic beverage?",
                    },
                    "in part": {
                        "type": "boolean",
                        "description": "Did the person drink part of the beverage?",
                    },
                    "in whole": {
                        "type": "boolean",
                        "description": "Did the person drink all of the beverage?",
                    },
                }
            }
        }
    }
]

```

This schema (or something very like it) is automatically generated
from the L4 JSON Schema transpiler. The description fields were
entered by hand in the above JSON snipped, but in future they could
come from the spreadsheet itself.

With this `tools`, we can now construct a function call of the form

``` javascript
Function( { "walk": true, "eat": false } )
```


## success criteria for demo 2

- system relies on LLM to extract output from free text conversation in some structured format, e.g. JSON or something obeying a grammar
- **system pours the user input into a slightly-more-formal representation of the query, and restates that representation back to the user, asking the user to confirm that is what they actually meant. This step could involve GF.**
- **iterate a few times until the user and the system agree they understand the query**
- system feeds the agreed query to the rule engine API, in deductive mode, with a desired goal in mind
- the rule engine API responds with a structured response, being one of
  - insufficient data to decide about goal; please ask for the following variables: `[v1, v2, ... vN]`
  - decision answer; basis for reasoning; citations to original source text
- **add layer of processing here for GF to help massage the response structure.**
- system passes the response to LLM, instructing transformation to a natural language explanation, with context of previous user conversation.

## Success Metrics for demo 1 and demo 2

1. externally, we compare LAG-less "vanilla" LLM reasoning with LAGgy reasoning relying on the rule engine

2. internally, the rule engine should operate correctly; given inputs, it should return the correct outputs, as defined in the L4 encoding which parses to some kind of mathlang




## Reasoning Modes

Four major modes of reasoning are envisioned. The first version of
this software supports the first mode. Future versions will support
the others.

In the **deductive** mode, the reasoning engine follows the pattern of an
expert system, calculating and explaining a particular answer based on
facts provided or extracted from a user conversation.

In the **abductive** mode, the reasoning engine offers guesses at ways to
arrive at a desired answer; if certain inputs have not been answered
definitively, the reasoner suggests possibilities that might be worth
investigating. We see this sort of thinking in medical diagnosis, as
seen on the TV show "House".

In the **planning** mode, the reasoning engine attempts to solve
planning problems by proposing a course of action, unfolding over
time, intended to achieve an outcome.

In the **constructive** mode, the reasoning engine offers feedback
about design errors and potential loopholes in a propose ruleset,
which defeat the purpose of the rules or could be exploited in an
adversarial context.




## See Also

- [Hallucination-Free?](https://dho.stanford.edu/wp-content/uploads/Legal_RAG_Hallucinations.pdf)
- Rainbird uses a similar term, "Retrieval Augmented Reasoning" (RAR): https://rainbird.ai/beyond-rag-why-retrieval-augmented-reasoning-rar-is-a-game-changer/
- [Certified Deductive Reasoning with Language Models](https://openreview.net/forum?id=yXnwrs2Tl6) 2024-05-29
- [BPMN-style AI](https://techcrunch.com/2024/06/06/tektonic-ai-raises-10m-to-build-genai-agents-for-automating-business-operations/)
- [Milvus and WhyHow](https://medium.com/enterprise-rag/milvus-integrated-into-whyhow-ais-open-source-rule-based-retrieval-package-835c8549f280)
- [Graph of Thoughts](https://github.com/spcl/graph-of-thoughts)
- [Significant new capabilities make it easier to use Amazon Bedrock to build and scale generative AI applications – and achieve impressive results](https://aws.amazon.com/blogs/machine-learning/new-capabilities-make-it-easier-to-use-amazon-bedrock-to-build-and-scale-generative-ai-applications-and-deliver-impact/)
- [Knowledge Graph vs. Vector RAG](https://neo4j.com/developer-blog/knowledge-graph-vs-vector-rag/)


## Footnote

The System 1 / System 2 dichotomy also finds echoes in Walter
Ong's Orality and Literacy, and in Plato's distinction between poetry
and philosophy.
