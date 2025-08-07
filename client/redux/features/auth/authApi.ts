import { apiSlice } from "../api/apiSlice";

import { userRegistration } from "./authSlice";

type RegistrationResponse = {
  message: string;
  activationToken: string;
};

type RegistrationData = {
  name: string;
  email: string;
  password: string;
};

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Endpoints Here
    register: builder.mutation<RegistrationResponse, RegistrationData>({
      query: (data) => ({
        url: "user/registration",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userRegistration({
              token: result.data.activationToken,
            })
          );
        } catch (error: unknown) {
          console.log(error);
        }
      },
    }),
    activation: builder.mutation({
      query: ({ activation_token, activation_code }) => ({
        url: "user/activation",
        method: "POST",
        body: {
          activation_token,
          activation_code,
        },
      }),
    }),
  }),
});
export const { useRegisterMutation, useActivationMutation } = authApi;
