import React, { useEffect, useState } from "react";
import { TodoContractAddress, TodoContractABI } from "../utility"
import { ConnectWalletButton } from "../components/ConnectWalletButton";
import { FaTrash } from "react-icons/fa";
import "../components/All.css";
const ethers = require("ethers");

export const Home = () => {
    const [account, setAccount] = useState(null);
    const [taskValue, setTaskValue] = useState("");
    const [formValue, setFormValue] = useState([{
        input: "",
        isDeleted: false
    }]
    )
    const [displayTasks, setDisplayTasks] = useState([]);

    const { ethereum } = window;
    const connectWallet = async () => {
        try {
            if (!ethereum) {
                console.log("Metamask not installed");
                return;
            }
            const sepoliaChainId = "0xaa36a7";
            const chainId = await ethereum.request({ method: "eth_chainId" });

            if (chainId !== sepoliaChainId) {
                alert("Wrong chain! Sepolia chain required!");
            }
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setAccount(accounts[0]);
        } catch (err) {
            console.log(err)
        }
    }

    async function contractInstance() {
        let provider, signer;
        provider = new ethers.BrowserProvider(ethereum);
        signer = await provider.getSigner();
        const Contract = new ethers.Contract(TodoContractAddress, TodoContractABI, signer);
        return Contract;
    }

    const handleInput = (e) => {
        const inputValue = e.target.value;
        setTaskValue(inputValue);
    }

    const addMyTask = async () => {
        const contract = await contractInstance();
        await contract.addTask(taskValue, false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setFormValue(
        //     [...formValue, { input: taskValue, isDeleted: false }]
        // )
        try {
            await addMyTask();
            console.log("Task added successfully");
            setTaskValue("");
        } catch (err) {
            console.log(err);
        }
    }

    const displayTaskList = async () => {
        try {
            if (account) {
                const contract = await contractInstance();
                const allTasks = await contract.getAllMyTasks();
                setDisplayTasks(allTasks);
            }
        } catch (error) {
            console.log(error)
        }
        // console.log(displayTasks);
        // console.log(allTasks)
    }

    const deleteTask = key => async () => {
        try {
            const contract = await contractInstance();
            await contract.deleteTask(key);
            console.log("Task deleted successfully!")
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        connectWallet();
        displayTaskList();
    });

    return (
        <div>
            <div className="connect">{account && <ConnectWalletButton account={account} />}</div>
            <div className="form-field">
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Start writing your tasks..." value={taskValue} onChange={handleInput} />
                    <button>Add</button>
                </form>
            </div>
            <div className="task-list">
                {
                    displayTasks.map(task => (
                        <div key={task.id} className="task-item">
                            {task.content}
                            <button onClick={deleteTask(task.id)}><FaTrash /></button>
                        </div>
                    ))
                }

            </div>
        </div>
    )
}