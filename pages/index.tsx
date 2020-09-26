import React from "react";
import {GetServerSideProps} from "next";
import fetch from "isomorphic-unfetch";
import Head from "next/head";

import {Pokemon} from "~/types/pokemon";

interface Props {
  pokemon: Pokemon;
}

const IndexRoute: React.FC<Props> = ({pokemon}) => {
  const [status, setStatus] = React.useState<"GUESSING" | "SUCCESS" | "FAIL">("GUESSING");
  const [name, setName] = React.useState<string>("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setStatus(name === pokemon.name ? "SUCCESS" : "FAIL");
  }

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        />
        <link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" />
      </Head>
      <style global jsx>
        {`
          html,
          body {
            font-family: "Press Start 2P", cursive;
          }
          * {
            box-sizing: border-box;
          }
          main {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
          }
          form {
            display: inline-flex;
          }
          img {
            pointer-events: none;
            user-select: none;
          }
        `}
      </style>
      <main>
        <h1>Quién es este Pokemon?</h1>
        <img
          alt="Pokemon"
          height={512}
          src={pokemon.sprites.front_default}
          style={{
            imageRendering: "pixelated",
            filter: `brightness(${status === "SUCCESS" ? 1 : 0})`,
            transition: "filter 0.5s",
          }}
          width={512}
        />
        {status === "SUCCESS" ? (
          <button autoFocus className="nes-btn is-primary" onClick={() => window.location.reload()}>
            Jugar nuevamente
          </button>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              className={`nes-input ${status === "FAIL" ? "is-error" : ""}`}
              onChange={(event) => setName(event.target.value)}
            />
            <button className="nes-btn is-primary" type="submit">
              Adivinar
            </button>
          </form>
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const pokemon = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${Math.round(Math.random() * (890 - 1) + 1)}`,
  ).then((res) => res.json());

  return {
    props: {pokemon},
  };
};

export default IndexRoute;
