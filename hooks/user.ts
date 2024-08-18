import { graphqlClient } from "@/clients/api";
import { getCurrentUserQuery } from "@/graphql/query/user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const data = await graphqlClient.request(getCurrentUserQuery);
      return data;
    },
  });

  return { ...query, user: query.data?.getCurrentUser };
};
