// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <=0.9.0;

contract TodoContract {
    event taskAdded(address _recipient, uint _taskId);
    event taskDeleted(uint _taskId, bool _isDeleted);

    struct Task {
        uint id;
        string content;
        bool isDeleted;
    }

    Task[] private allTasks;
    mapping(uint => address) taskIdToOwner;

    function addTask(string memory _content, bool _isDeleted) external {
        uint taskId = allTasks.length;
        allTasks.push(Task(taskId, _content, _isDeleted));
        taskIdToOwner[taskId] = msg.sender;

        // Log the taskAdded event
        emit taskAdded(msg.sender, taskId);
    }

    function getAllMyTasks() external view returns (Task[] memory) {
        Task[] memory filterMyTasks = new Task[](allTasks.length);
        uint counter = 0;

        for (uint i = 0; i < allTasks.length; i++) {
            if (
                taskIdToOwner[i] == msg.sender && allTasks[i].isDeleted == false
            ) {
                filterMyTasks[counter] = allTasks[i];
                counter++;
            }
        }

        Task[] memory myTasks = new Task[](counter);

        for (uint i = 0; i < counter; i++) {
            myTasks[i] = filterMyTasks[i];
        }

        return myTasks;
    }

    function deleteTask(uint _taskId) external {
        if (taskIdToOwner[_taskId] == msg.sender) {
            allTasks[_taskId].isDeleted = true;
        }

        // Log the taskDeleted event
        emit taskDeleted(_taskId, true);
    }
}
