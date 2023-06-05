import "../App.css";
import { React, useState } from "react";
import { Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

var Forms = () => {
  const [show, setShow] = useState(false);
  const [showT, setShowT] = useState(false);
  const [numberOfItems, setnumberOfItems] = useState(6);
  const [minimumBuy, setminimumBuy] = useState(1);
  const [finalList, setFinalList] = useState([]);
  const [combinations, setCombinations] = useState([]);
  const [table2, setTable2] = useState({});
  const [given, setGiven] = useState("");
  const [expected, setExpected] = useState("");
  const [confidence, setConfidence] = useState(0.0);
  const [buyingList, setbuyingList] = useState(
    "2-123,\n2-21,\n3-32,\n1-145,\n2-153,\n3-245,\n4-543,\n1-23,\n2-2543,\n4-234"
  );

  var temp = [];
  var n = [[]];
  var tables = {};

  function allpossible(str) {
    const result = [];
    for (let i = 1; i < Math.pow(2, str.length) - 1; i++)
      result.push([...str].filter((_, pos) => (i >> pos) & 1).join(""));
    result.push(str);
    return result;
  }

  /*const buyingList = [
    [2, "123"],
    [2, "21"],
    [3, "32"],
    [1, "145"],
    [2, "153"],
    [3, "245"],
    [4, "543"],
    [1, "23"],
    [2, "2543"],
    [4, "234"],

    "2-123\n
    2-21\n
    3-32\n
    1-145\n
    2-153\n
    3-245\n
    4-543\n
    1-23\n
    2-2543\n
    4-234"
];*/

  const notFound = (buy, given) => {
    for (var i = 0; i < given.length; i++) {
      if (!buy.includes(given[i])) return true;
    }
    // console.log("f", given);
    return false;
  };

  const apriory = () => {
    for (var i = 0; i < combinations.length; i++) {
      tables[combinations[i]] = 0;
      for (var j = 0; j < finalList.length; j++) {
        if (!notFound(finalList[j][1], combinations[i]))
          tables[combinations[i]] += finalList[j][0];
      }
      if (tables[combinations[i]] < minimumBuy) {
        delete tables[combinations[i]];
      }
    }
    //setCombinations(te);
    setTable2(tables);
    console.log(tables);
  };

  const calTables = () => {
    setTable2({});
    tables = {};
    var str = "";
    for (var i = 1; i <= numberOfItems; i++) {
      str += i.toString();
    }
    str = allpossible(str);
    setCombinations(str);
    console.log(combinations);
    apriory();
    console.log(tables["12"]);
    setShowT(true);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    if (!showT) alert("Press on calculate table button first");
    var total = 0;
    var bias = 0;
    finalList.forEach((buy) => {
      if (!notFound(buy[1], given)) total += buy[0];
    });

    var t = given + expected;
    finalList.forEach((buys) => {
      if (buys[0] < minimumBuy) {
      } else if (!notFound(buys[1], t)) bias += buys[0];
    });
    if (total == 0) setConfidence(0.0);
    else setConfidence(bias / total);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setTable2({});
    tables = {};
    //console.log(buyingList);
    let newstr = "";
    for (var i = 0; i < buyingList.length; i++)
      if (!(buyingList[i] === "\n" || buyingList[i] === "\r"))
        newstr += buyingList[i];

    n = newstr.split(",");

    //console.log(n);
    for (i = 0; i < n.length; i++) {
      var t = n[i].split("-");
      //console.log("t:" + t);
      temp.push([parseInt(t[0]), t[1]]);
    }
    setFinalList(temp);

    if (numberOfItems > 0 && minimumBuy > 0 && finalList !== "") {
      setShow(true);
    } else alert("Fill up all the fields with valid informations");
  };

  return (
    <>
      <h1>APRIORY</h1>
      <div className="App">
        <div className="mainpart">
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Number of Items</Form.Label>
              <Form.Control
                type="number"
                value={numberOfItems}
                onChange={(e) => setnumberOfItems(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Item buying list </Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="'number of transactions - list(eg 134)' for buying 1st, 3rd and 4th items together. ',' for a new entry."
                value={buyingList}
                onChange={(e) => setbuyingList(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Minimum frequency</Form.Label>
              <Form.Control
                type="number"
                value={minimumBuy}
                onChange={(e) => setminimumBuy(e.target.value)}
              />
            </Form.Group>
            <Button type="submit" variant="info" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>

          {show && (
            <>
              <Form>
                <Form.Group>
                  <Button id="cal" variant="info" onClick={calTables}>
                    Calculate Tables
                  </Button>
                </Form.Group>
                <Form.Label>Calculate Confidence</Form.Label>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Given</Form.Label>
                  <Form.Control
                    type="number"
                    value={given}
                    onChange={(e) => setGiven(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Expected</Form.Label>
                  <Form.Control
                    type="number"
                    value={expected}
                    onChange={(e) => setExpected(e.target.value)}
                  />
                </Form.Group>
                <Button type="submit" variant="info" onClick={handleSubmit2}>
                  Submit
                </Button>
                <Form.Group
                  className="label"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>Confidence: {confidence}</Form.Label>
                </Form.Group>
              </Form>
            </>
          )}
        </div>
        {showT && (
          <div id="cont">
            <ul>
              {[...Array(combinations.length)].map((e, i) => (
                <div>
                  {table2[combinations[i]] > 0 && (
                    <li>
                      <div className="liss">
                        Items:{"    "}
                        <span id="l">
                          {combinations[i]} - {table2[combinations[i]]}
                        </span>
                      </div>
                    </li>
                  )}
                </div>
              ))}
              {/* // <div>{combinations[i]}</div>-<div>{table2[combinations[i]]}</div> */}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Forms;
