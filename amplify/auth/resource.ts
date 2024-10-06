import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 */
export const auth = defineAuth({
  loginWith: {
    email: true, // Users log in with email
  },
});
