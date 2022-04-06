import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [todoList, setTodoList] = useState([]);
	const [item, setItem] = useState("");
	const line = (X) => {
		const newList = todoList.filter((element, i) => X !== i);
		setTodoList(newList);

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var requestOptions = {
			method: "PUT",
			headers: myHeaders,
			body: raw,
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/marcus-louis",
			requestOptions
		)
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	};
	fetch("https://assets.breatheco.de/apis/fake/todos/user/marcus-louis", {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify([...todoList, { label: "Homework", done: false }]),
		redirect: "follow",
	})
		.then((response) => response.json())
		.then((result) => console.log(result))
		.catch((error) => console.log("error", error));

	useEffect(() => {
		let requestOptions = {
			method: "GET",
			redirect: "follow",
		};
		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/marcus-louis",
			requestOptions
		)
			.then((response) => response.status)

			.catch((error) => console.log("error", error));
	}, []);
	console.log(todoList);

	return (
		<>
			<div>
				<input
					type="text"
					className="fore-control"
					placeholder="username"
					onChange={(e) => setItem(e.target.value)}
					value={item}
				/>
				<a
					onClick={() => {
						if (item !== "") {
							setTodoList([
								...todoList,
								{ label: item, done: false },
							]);
							setItem("");
						}
					}}
					type="button"
					className="btn btn-primary"
					id="basic-addon1">
					Button
				</a>
			</div>
			<ul>
				{todoList.map((element, index) => {
					return (
						<>
							<li key={index} className="mr-2">
								{element.label}

								<a
									className="m1-2 btn btn-danger"
									onClick={() => {
										line(index);
									}}>
									X
								</a>
								<a
									className="m1-2 btn btn-danger"
									onClick={() => {
										line(index);
									}}>
									X
									<p className="text-decoration-line-through"></p>
								</a>
							</li>
						</>
					);
				})}
			</ul>
		</>
	);
};
export default Home;
