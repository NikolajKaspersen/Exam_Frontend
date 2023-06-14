import React, {useEffect, useState} from "react";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import facade from "../../apiFacade.js";

const Admin_User = () => {

    const [concerts, setConcerts] = useState([]);
    const [dataFromServer, setDataFromServer] = useState("Waiting...");
    // Bog data gemmes på en liste med useState


    useEffect(() => {
        facade.fetchConcerts().then((res) => {
            if(res){
                setConcerts(res);
                console.log(res)
            }
            setDataFromServer(res.msg);
        });
    }, []);

    return (
        <div>
            <br></br>
            <h1>Concerts in Database</h1>
            <h3>{dataFromServer}</h3>


            {Concerts.map((item) => {
                return (
                    <>
                        <br/>

                        <Table className="table table-info" bordered hover>
                            <thead>
                            <tr>
                                <th style={{width: "8%"}}>Name</th>
                                <th style={{width: "8%"}}>Duration</th>
                                <th style={{width: "8%"}}>Location</th>
                                <th style={{width: "9%"}}>Startdate</th>
                                <th style={{width: "9%"}}>Startime</th>
                                <th style={{width: "9%"}}>Edit Concert</th>
                                <th style={{width: "9%"}}>Delete Concert</th>
                            </tr>
                            </thead>
                            <tbody key={item.id}>
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.duration}</td>
                                <td>{item.location}</td>
                                <td>{item.startdate}</td>
                                <td>{item.starttime}</td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            facade.editConcert(item.id, item.name, item.duration, item.location, item.startdate, item.starttime)
                                        }}
                                    >
                                        Edit Concert
                                    </Button>
                                </td>
                                <td>
                                    <Button
                                        onClick={() => {
                                            facade.deleteConcert(item.id)
                                        }}
                                    >
                                        Delete Concert
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>
                    </>
                );
            })}
        </div>
    );

}

export default Admin_User;