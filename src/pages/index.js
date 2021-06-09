import Head from "next/head";
import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0";
import styled from "styled-components";
import Form from "../components/Form/Form";
import Navbar from "../components/Navbar/Navbar";
import Note from "../components/Note/Note";

const App = () => {
	const [showForm, setShowForm] = useState(false);
	const [notes, setNotes] = useState([]);
	const [refresh, setRefresh] = useState(false);
	const { user, isLoading, error } = useUser();

	useEffect(() => {
		// Our notes from LocalStorage (our DB)
		const store = JSON.parse(localStorage.getItem("next:note-app"));

		setNotes(store);
	}, [refresh]);

	return (
		<>
			<Head>
				<title>Next.js note app with auth0</title>
				<meta
					name="description"
					content="A basic crud project to illustrate how to use autho in a next.js app"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Wrapper>
				<Navbar />
				{isLoading ? (
					<p className="nodata-indicator">Loading...</p>
				) : error ? (
					<p>{error?.message}</p>
				) : user ? (
					<>
						{showForm ? (
							<article className="form-wrapper">
								<Form
									setRefresh={() => setRefresh(!refresh)}
									hideForm={setShowForm}
								/>
							</article>
						) : (
							<article className="form-wrapper">
								<button onClick={() => setShowForm(!showForm)} type="button">
									Add note
								</button>
							</article>
						)}
						{!notes?.length ? (
							<div>
								<p className="nodata-indicator">
									No notes available, Click on the button above to add
								</p>
							</div>
						) : (
							<article className="notes-wrapper">
								{notes.map((note) => {
									return (
										<Note
											key={note.id}
											id={note.id}
											title={note.title}
											content={note.content}
											setRefresh={() => setRefresh(!refresh)}
										/>
									);
								})}
							</article>
						)}
					</>
				) : (
					<div>
						<p className="non-auth-text">
							Welcome to my next.js note app, sign in to get started
						</p>
					</div>
				)}
			</Wrapper>
		</>
	);
};

const Wrapper = styled.section`
	margin: 1rem 0;
	max-width: 100%;
	overflow-x: hidden;
	height: 100%;

	.form-wrapper {
		max-width: 60%;
		margin: 1.5rem auto 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;

		button {
			border: none;
			outline: none;
			background: #5b6d5b;
			color: #fff;
			font-size: 1rem;
			height: 2.6rem;
			width: 10rem;
			border-radius: 5px;
			transition: opacity 0.7s;

			&:hover {
				opacity: 0.8;
			}
		}
	}

	.notes-wrapper {
		max-width: 95%;
		margin: 4rem auto;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		grid-gap: 2rem;
	}

	.nodata-indicator {
		margin-top: 4rem;
		text-align: center;
	}

	.non-auth-text {
		margin-top: 4rem;
		text-align: center;
		font-size: 1.5rem;
	}
`;

export default App;
