import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Tables = (props) => {
  const [given, setGiven] = useState("");
  const [expected, setExpected] = useState("");
  const [confidence, setConfidence] = useState(0.0);
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
];*/

  var buyingList = props.finalList;
  var minimumBuy = props.minimumBuy;
  var numberOfItems = props.numberOfItems;

  const notFound = (buy, given) => {
    for (var i = 0; i < given.length; i++) {
      if (!buy.includes(given[i])) return true;
    }
    // console.log("f", given);
    return false;
  };

  const handleSubmit = (e) => {
    console.log(props.finalList);
    e.preventDefault();
    var total = 0;
    var bias = 0;
    buyingList.forEach((buy) => {
      if (!notFound(buy[1], given)) total++;
    });

    var t = given + expected;
    buyingList.forEach((buys) => {
      if (buys[0] < minimumBuy) {
      } else if (!notFound(buys[1], t)) bias++;
    });
    setConfidence(bias / total);
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Given</Form.Label>
          <Form.Control
            type="number"
            value={given}
            onChange={(e) => setGiven(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Expected</Form.Label>
          <Form.Control
            type="number"
            value={expected}
            onChange={(e) => setExpected(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="info" onClick={handleSubmit}>
          Submit
        </Button>
        <Form.Group className="label" controlId="exampleForm.ControlInput1">
          <Form.Label>Confidence: {confidence}</Form.Label>
        </Form.Group>
      </Form>
    </>
  );
};

export default Tables;
