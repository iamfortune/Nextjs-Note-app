import { useUser } from "@auth0/nextjs-auth0";
import styled from "styled-components";

const Navbar = () => {
	const { user } = useUser();

	return (
		<Nav>
			<h1>My Nextjs Note App</h1>
			{!user ? (
				<a href="/api/auth/login">Sign In</a>
			) : (
				<a href="/api/auth/logout">Sign Out</a>
			)}
		</Nav>
	);
};

const Nav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 90%;
	margin: 0 auto;

	h1 {
		font-size: 1.4rem;
		font-style: oblique;
	}

	& > div {
		display: flex;

		a {
			margin-left: 1rem;
		}
	}

	a {
		display: block !important;
		border: none;
		outline: none;
		background: #5b6d5b;
		color: #fff;
		font-size: 1rem;
		padding: 0.8rem 2.5rem;
		border-radius: 5px;
		transition: opacity 0.7s;
		text-decoration: none;

		&:hover {
			opacity: 0.8;
		}
	}
`;

export default Navbar;
