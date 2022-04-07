import React, { useState, useEffect } from "react";

//create your first component
const Home = () => {
	const [todoList, setTodoList] = useState([]);
	const [item, setItem] = useState("");

	const line = (newitem) => {
		// 		fetch("https://assets.breatheco.de/apis/fake/todos/user/marcus-louis", {
		// 	method: "PUT",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// 	body: JSON.stringify([...todoList, { label: "Homework", done: false }]),
		// 	redirect: "follow",
		// })
		// 	.then((response) => response.json())
		// 	.then((result) => console.log(result))
		// 	.catch((error) => console.log("error", error));

		let newlist = [...todoList, { label: newitem, done: false }];
		setTodoList(newlist);

		var myHeaders = new Headers();
		myHeaders.append("Content-Type", "application/json");

		var requestOptions = {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newlist),
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/marcus-louis",
			requestOptions
		)
			.then((response) => {
				response.status === 200 ? setTodoList(newlist) : "";
			})

			.catch((error) => console.log("error", error));
	};

	useEffect(() => {
		let requestOptions = {
			method: "GET",
			redirect: "follow",
		};

		fetch(
			"https://assets.breatheco.de/apis/fake/todos/user/marcus-louis",
			requestOptions
		)
			.then((response) => response.json())
			.then((result) => setTodoList(result))
			.catch((error) => console.log("error", error));
	}, []);

	const cut = (index) => {
		const par = todoList.filter((list, i) => index !== i);
		setTodoList(par);
		fetch("https://assets.breatheco.de/apis/fake/todos/user/createdname", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(par),
			redirect: "follow",
		})
			.then((response) => {
				response.status === 200 ? setTodoList(par) : "";
			})
			.catch((error) => console.log("error", error));
	};

	const strik = (index) => {
		const todosArray = [...todoList];
		todosArray[index].done = !todosArray[index].done;
		setTodoList(todosArray);
	};

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
							line(item);
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
								<span className={element.done ? "strik" : ""}>
									{element.label}
								</span>
								<button
									className="m1-2 btn btn-danger"
									onClick={() => {
										strik(index);
									}}>
									strike
								</button>
								<a
									className="m1-2 btn btn-danger"
									onClick={() => {
										cut(index);
									}}>
									X
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
