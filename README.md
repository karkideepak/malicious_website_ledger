# malicious_website_ledger
This tracker is used to manage and monitor malicious URLs that have been identified and blocked. It allows analysts to track status, duration, and follow-up actions across incidents tied to ServiceNow or Jira.
malicious-tracker/
│
├── package.json                  # dependencies & scripts
├── vite.config.js                # build config
├── index.html                    # HTML entry point
│
├── src/
│   ├── main.jsx                  # React root mount
│   ├── App.jsx                   # top-level layout shell
│   │
│   ├── data/
│   │   └── seedData.js           # initial mock entries
│   │
│   ├── utils/
│   │   ├── defang.js             # URL defang logic
│   │   ├── dateUtils.js          # daysSince(), formatDate()
│   │   └── textUtils.js          # initials(), truncate()
│   │
│   ├── constants/
│   │   └── status.js             # STATUS enum, pill colors, icons
│   │
│   ├── hooks/
│   │   ├── useTracker.js         # core state: data, add, delete, search
│   │   └── useLocalStorage.js    # persist data across sessions
│   │
│   ├── components/
│   │   ├── TrackerHeader/
│   │   │   ├── TrackerHeader.jsx
│   │   │   └── TrackerHeader.module.css
│   │   │
│   │   ├── StatCards/
│   │   │   ├── StatCards.jsx
│   │   │   └── StatCards.module.css
│   │   │
│   │   ├── TrackerTable/
│   │   │   ├── TrackerTable.jsx
│   │   │   ├── TrackerTable.module.css
│   │   │   ├── TableRow.jsx
│   │   │   └── StatusPill.jsx
│   │   │
│   │   ├── AddEntryModal/
│   │   │   ├── AddEntryModal.jsx
│   │   │   └── AddEntryModal.module.css
│   │   │
│   │   └── ui/                   # reusable primitives
│   │       ├── Avatar.jsx
│   │       ├── Badge.jsx
│   │       ├── Button.jsx
│   │       └── SearchInput.jsx
│   │
│   └── styles/
│       ├── globals.css           # CSS variables, reset, base
│       └── tokens.css            # spacing, radius, typography scale
│
└── tests/
    ├── utils/
    │   ├── defang.test.js        # unit tests for defang logic
    │   └── dateUtils.test.js
    └── components/
        └── TrackerTable.test.jsx # component smoke tests
