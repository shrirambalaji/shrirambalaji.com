import { gql, GraphQLClient } from "graphql-request";

const GITHUB_URL = "https://api.github.com/graphql";
const client = new GraphQLClient(GITHUB_URL, {
  headers: {
    authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
  },
});

const buildQuery = (username: string) => gql`
  {
    user(login: "${username}") {
      pinnedItems(first: 6) {
        totalCount
        edges {
          node {
            ... on Repository {
              name
              nameWithOwner
              id
              url
              owner {
                avatarUrl
              }
              primaryLanguage {
                color
                name
              }
              openGraphImageUrl
              usesCustomOpenGraphImage
              description
              stargazers {
                totalCount
              }
            }
          }
        }
      }
    }
  }
`;

export type GithubUser = {
  pinnedItems: PinnedRepos;
};

export type PinnedRepos = {
  totalCount: number;
  edges: Array<{
    node: PinnedRepo;
  }>;
};

export type PinnedRepo = {
  name: string;
  nameWithOwner: string;
  owner: { avatarUrl: string };
  id: string;
  url: string;
  description: string;
  openGraphImageUrl: string;
  usesCustomOpenGraphImage: boolean;
  stargazers: {
    totalCount: number;
  };
};

export const fetchGithubPinnedRepos = async (
  username: string
): Promise<PinnedRepo[]> => {
  const query = buildQuery(username);
  const { user }: { user: GithubUser } = await client.request(query);
  return user.pinnedItems.edges.map((edge) => edge.node);
};
