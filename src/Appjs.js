import logo from "./logo.svg"; // декларативный стиль
import "./App.css"; // декларативный стиль
import { createElement } from "react";

function getDate() {
	// декларативный стиль
	const today = new Date();
	const month = today.getMonth() + 1;
	const year = today.getFullYear();
	const date = today.getDate();
	return `${date}/${month}/${year}`;
}

export default function AppJs() {
	const currentDate = getDate();
	return createElement(
		"div",
		{
			className: "App",
		},
		createElement(
			"header",
			{
				className: "App-header",
			},
			createElement("img", {
				className: "App-logo",
				src: `${logo}`,
				alt: "logo",
			}),
			createElement(
				"p",
				null,
				"Edit",
				createElement("code", null, " src/App.js"),
				" and save to reload 2."
			),
			createElement(
				"a",
				{
					className: "App-link",
					href: "https://reactjs.org",
					target: "_blank",
					rel: "noopener noreferrer",
				},
				"Learn React"
			),
			createElement("h2", null, `${currentDate}`)
		)
	);
}
