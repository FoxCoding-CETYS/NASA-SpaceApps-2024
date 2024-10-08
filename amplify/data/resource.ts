import { type ClientSchema, a, defineData } from "@aws-amplify/backend";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/

const schema = a.schema({
  LogEntry: a
    .model({
      date: a.date(),            // Date of log entry
      location: a.string(),         // Field/Location where the log was recorded
      cropType: a.string(),         // Type of crop
      soilCondition: a.string(),    // Condition of the soil (Dry, Moist, Wet)
      weather: a.string(),          // Weather condition (Sunny, Cloudy, Rainy, etc.)
      pestObservations: a.string(), // Observations on pests and diseases
      generalNotes: a.string(),     // Additional notes
    })
    .authorization((allow) => [
      allow.owner().to(['create', 'read', 'update', 'delete']) // Only the owner can CRUD the entry
    ]),

  UserSettings: a
    .model({
      latitude: a.float(),        // Latitude
      longitude: a.float(),       // Longitude
    })
    .authorization((allow) => [
      allow.owner().to(['create', 'read', 'update', 'delete']) // Only the owner can CRUD the settings
    ]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: "userPool",  // Use Cognito User Pools for authentication
  },
});


/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
