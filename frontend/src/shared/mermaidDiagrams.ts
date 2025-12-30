export interface MermaidDiagramConfig {
  definition: string;
  description?: string;
}

export const mermaidDiagrams: Record<string, MermaidDiagramConfig> = {
  'assistant-architecture-2': {
    definition: `%%{init: {'themeVariables': {'fontSize': '50px'}, 'flowchart': {'nodeSpacing': 80, 'rankSpacing': 200, 'padding': 30}}}%%
flowchart LR
    %% Horizontal layout

    User[Mobile interface]

    subgraph API [API Container]
        direction TB
        API_Endpoint[API Endpoint<br/>FastAPI]
        Supervisor[Supervisor<br/>Agent]
        SSE[SSE Stream]
    end

    Redis[(Redis<br/>Broker & Backend)]

    subgraph Worker ["Worker Container"]
        direction TB
        Worker_Process[Worker Process]
        Agents[Specialized Sub-Agent]
    end

    Ext[External APIs]

    %% Styling - Refined Professional Palette
    classDef apiContainer fill:#BBDEFB,stroke:#1565C0,stroke-width:3px,color:#000;
    classDef workerContainer fill:#D1C4E9,stroke:#512DA8,stroke-width:3px,color:#000;
    classDef infrastructure fill:#FFCCBC,stroke:#D84315,stroke-width:3px,color:#000;
    classDef component fill:#FAFAFA,stroke:#424242,stroke-width:2px,color:#000;
    classDef user fill:#B3E5FC,stroke:#0288D1,stroke-width:2px,color:#000;
    classDef external fill:#C5E1A5,stroke:#558B2F,stroke-width:2px,color:#000;

    class API apiContainer;
    class Worker workerContainer;
    class Redis infrastructure;
    class API_Endpoint,Supervisor,SSE,Worker_Process,Agents component;
    class User user;
    class Ext external;

    %% Flows
    User -->|Query/Context | API_Endpoint
    API_Endpoint -->|Evaluate| Supervisor

    Supervisor -->|Quick Reply| User
    Supervisor -->|Delegate| Redis

    Redis -->|Pop| Worker_Process
    Worker_Process -->|Spawn| Agents
    Agents -->|Action| Ext

    Worker_Process -.->|Status| Redis
    Redis -.->|Stream| SSE
    SSE -.->|Notify| User

    %% Edge Styling - Simplified arrows
    linkStyle 0 stroke:#757575,stroke-width:6px
    linkStyle 1 stroke:#757575,stroke-width:6px
    linkStyle 2 stroke:#757575,stroke-width:6px
    linkStyle 3 stroke:#757575,stroke-width:6px
    linkStyle 4 stroke:#757575,stroke-width:6px
    linkStyle 5 stroke:#757575,stroke-width:6px
    linkStyle 6 stroke:#757575,stroke-width:6px
    linkStyle 7 stroke:#757575,stroke-width:6px,stroke-dasharray: 15 10
    linkStyle 8 stroke:#757575,stroke-width:6px,stroke-dasharray: 15 10
    linkStyle 9 stroke:#757575,stroke-width:6px,stroke-dasharray: 15 10`,
    description: 'New architecture of the personal assistant showing the API container with supervisor agent, Redis broker for task delegation, worker containers with specialized sub-agents.'
  },
  'evaluator-optimizer-workflow': {
    definition: `%%{init: {'themeVariables': {'fontSize': '50px'}}}%%
flowchart LR
    Start[Query] --> Generate[Initial Response]
    Generate --> Overseer[Evaluator Model]
    Overseer --> Evaluate{Satisfactory?}
    
    Evaluate -->|Yes| Output[Return Output]
    Evaluate -->|No| Clarify{Clarification needed?}
    
    Clarify -->|Yes| Prompt[Prompt User]
    Prompt --> Regenerate1[Regenerate]
    Regenerate1 -.-> Overseer
    
    Clarify -->|No| External{External data needed?}
    
    External -->|Yes| AskPermission[Fetch data]
    AskPermission --> PermissionCheck{Sufficient data?}
    
    PermissionCheck -->|Yes| Regenerate2[Regenerate Response]
    Regenerate2 -.-> Overseer
    
    PermissionCheck -->|No| External
    
    External -->|No| FetchData[Use feedback]
    FetchData --> Regenerate3[Regenerate Response]
    Regenerate3 -.-> Overseer
    
    %% Styling
    classDef userAction fill:#dae8fc,stroke:#6c8ebf,stroke-width:1.5px,color:#000;
    classDef process fill:#ffe6cc,stroke:#d79b00,stroke-width:1.5px,color:#000;
    classDef decision fill:#d5e8d4,stroke:#82b366,stroke-width:1.5px,color:#000;
    classDef output fill:#dae8fc,stroke:#6c8ebf,stroke-width:1.5px,color:#000;
    
    class Start,Prompt,AskPermission,Output userAction;
    class Generate,Overseer,Regenerate1,Regenerate2,Regenerate3,FetchData process;
    class Evaluate,Clarify,External,PermissionCheck decision;
    class Output output;
    
    %% Edge Styling - Make arrows more visible
    linkStyle 0 stroke:#f5f5f5,stroke-width:10px
    linkStyle 1 stroke:#f5f5f5,stroke-width:10px
    linkStyle 2 stroke:#f5f5f5,stroke-width:10px
    linkStyle 3 stroke:#f5f5f5,stroke-width:10px
    linkStyle 4 stroke:#f5f5f5,stroke-width:10px
    linkStyle 5 stroke:#f5f5f5,stroke-width:10px
    linkStyle 6 stroke:#f5f5f5,stroke-width:10px
    linkStyle 7 stroke:#f5f5f5,stroke-width:10px,stroke-dasharray: 20 10
    linkStyle 8 stroke:#f5f5f5,stroke-width:10px
    linkStyle 9 stroke:#f5f5f5,stroke-width:10px
    linkStyle 10 stroke:#f5f5f5,stroke-width:10px
    linkStyle 11 stroke:#f5f5f5,stroke-width:10px
    linkStyle 12 stroke:#f5f5f5,stroke-width:10px,stroke-dasharray: 20 10
    linkStyle 13 stroke:#f5f5f5,stroke-width:10px
    linkStyle 14 stroke:#f5f5f5,stroke-width:10px
    linkStyle 15 stroke:#f5f5f5,stroke-width:10px
    linkStyle 16 stroke:#f5f5f5,stroke-width:10px,stroke-dasharray: 20 10`,
    description: 'Workflow showing how the assistant evaluates responses, requests clarification or external data when needed, and regenerates responses until satisfactory.'
  }
};
