import { gql } from "@apollo/client";

export const GET_ANIMES = gql`
  query GetAnimes(
    $id: Int
    $page: Int
    $perPage: Int
    $search: String
    $sort: [MediaSort]
  ) {
    Page(page: $page, perPage: $perPage) {
      pageInfo {
        total
        currentPage
        lastPage
        hasNextPage
        perPage
      }
      media(id: $id, search: $search, sort: $sort) {
        id
        title {
          romaji
        }
        coverImage {
          extraLarge
          large
          medium
          color
        }
      }
    }
  }
`;

export const GET_ANIME_BY_ID = gql`
  query GetAnimeById($id: Int) {
    Media(id: $id) {
      id
      title {
        romaji
      }
      bannerImage
      coverImage {
        extraLarge
        large
        medium
        color
      }
      description
      genres
      averageScore
      episodes
    }
  }
`;
