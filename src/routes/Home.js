import React from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import Movie from "../Components/Movie";

const GET_MOVIES = gql`
  query {
    movies {
      id
      medium_cover_image
      isLiked @client
    }
  }
`;
//@client 를 이용해 클라이언트에 이게 있다고 알려준다.

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
const Header = styled.header`
  background-image: linear-gradient(-45deg, #d754ab, #fd723a);
  height: 45vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
const Title = styled.h1`
  font-size: 60px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const Subtitle = styled.h3`
  font-size: 35px;
`;
const Loading = styled.div`
  font-size: 18px;
  opacity: 0.5;
  font-weight: 500;
  margin-top: 10px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  position: relative;
  top: -50px;
`;

export default () => {
  const { loading, data } = useQuery(GET_MOVIES);
  return (
    <Container>
      <Header>
        <Title>Apollo 2020</Title>
        <Subtitle>I love GraphQL</Subtitle>
      </Header>
      {loading && <Loading>Loading...</Loading>}
      {!loading && data.movies && (
        <Movies>
          {data.movies.map((m) => (
            <Movie
              key={m.id}
              id={m.id}
              isLiked={m.isLiked}
              bg={m.medium_cover_image}
            />
          ))}
        </Movies>
      )}
    </Container>
  );
};
