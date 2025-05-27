### React Query / Tanstack Query

## 1. Introduction (5 minutes)

- Brief overview of state management in React
- The traditional approach with Redux
- The emergence of React Query as a modern solution

Below are the requirements for a best state management tool

Is persisted remotely in a location you may not control or own
Requires asynchronous APIs for fetching and updating
Implies shared ownership and can be changed by other people without your knowledge
Can potentially become "out of date" in your applications if you're not careful

Caching... (possibly the hardest thing to do in programming)
Deduping multiple requests for the same data into a single request
Updating "out of date" data in the background
Knowing when data is "out of date"
Reflecting updates to data as quickly as possible
Performance optimizations like pagination and lazy loading data
Managing memory and garbage collection of server state
Memoizing query results with structural sharing

## 2. Understanding the Different Types of State (5 minutes)

- Server State: Data from API calls, needs synchronization
- Client State: UI state, form state, local application state
- Why this distinction matters for choosing the right tool

# Server State

Server state refers to the data fetched from an API or a backend server. This data is not yet processed or manipulated by the client-side code. When working with server state, it is essential to handle asynchronous data fetching and caching to ensure a smooth user experience.

# Client State

Client state refers to the data that is specific to the client-side and is not dependent on server data. This includes UI state, form data, and other ephemeral information.

In React, you can manage client state using built-in hooks like useState and useReducer, or use state management libraries like Redux.

## 3. Pain Points with Redux (10 minutes)

### Challenges in Traditional Redux Implementation

- Boilerplate Heavy
  - Actions, reducers, action creators
  - Middleware setup for async operations
  - Store configuration
- Complex Async Data Handling
  - Manual management of loading states
  - Error handling complexity
  - Need for additional middleware (Redux Thunk/Saga)
- Manual Cache Management
  - No built-in caching mechanism
  - Manual implementation of data freshness
  - Complex revalidation logic

## 4. React Query Solutions (15 minutes)

### Key Advantages

- Simplified Data Fetching
- Automatic Features
  - Built-in caching
  - Background data updates
  - Automatic error handling
  - Loading state management
  - Data revalidation
- Performance Optimizations
  - Smart request deduplication
  - Parallel queries
  - Infinite scrolling support
  - Optimistic updates
- Developer Experience
  - Less boilerplate
  - Intuitive API
  - Built-in DevTools
  - TypeScript support

## 5. When to Use What (5 minutes)

### React Query

- Server state management
- API data caching
- Real-time data requirements
- REST/GraphQL APIs

### Redux

- Complex client state
- Global UI state
- State that needs time-travel debugging
- Shared state between unrelated components
