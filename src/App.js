//import logo from "./logo.svg";
import { useState } from "react";
import { Button, Col, Row, Card, Input, Select } from "antd";
import "antd/dist/reset.css";
import "./App.css";
import { query } from "./generate";
const { TextArea } = Input;

function App() {
  const [inputText, setInputText] = useState();
  const [resultText, setResultText] = useState();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(false);
  const [model, setModel] = useState("davinchi");
  const handleChange = (value) => {
    setMode(value);
    console.log(`selected ${value}`);
  };
  const handleModelChange = (value) => {
    setModel(value);
    console.log(`selected ${value}`);
  };
  function generatePrompt(_query) {
    if (mode === "Rewrite")
      return `rewrite the content with 1000 words:
  content: ${_query}
  `;
    else
      return `blog topic :${_query}
  blog content with detail:`;
  }
  const handleRunClick = async () => {
    setLoading(true);
    const result = await query({
      prompt: generatePrompt(inputText),
      model: model === "davinchi" ? "text-davinci-002" : `text-${model}-001`,
    });
    setResultText(result);
    setLoading(false);
  };
  return (
    <div className="App">
      <Col align="center">
        <Card
          title="Content Rewriter"
          bordered={false}
          style={{ width: "90%" }}
        >
          <Row align="right">
            <Col style={{ padding: 5 }}>
              <Select
                defaultValue="Rewrite"
                style={{
                  width: 120,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: "Rewrite",
                    label: "Rewrite",
                  },
                  {
                    value: "Answer",
                    label: "Answer",
                  },
                ]}
              />
            </Col>
            <Col style={{ padding: 5 }}>
              <Select
                defaultValue="davinchi"
                style={{
                  width: 120,
                }}
                onChange={handleModelChange}
                options={[
                  {
                    value: "davinchi",
                    label: "Davinchi",
                  },
                  {
                    value: "ada",
                    label: "Ada",
                  },
                  {
                    value: "curie",
                    label: "Curie",
                  },
                  {
                    value: "babbage",
                    label: "Babbage",
                  },
                ]}
              />
            </Col>
            <Col style={{ padding: 5 }}>
              <Button onClick={handleRunClick} loading={loading}>
                {loading ? "Loading..." : "Generate"}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={12} style={{ padding: 5 }}>
              <TextArea
                rows={24}
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
              />
            </Col>
            <Col span={12} style={{ padding: 5 }}>
              <TextArea
                rows={24}
                placeholder="Content"
                value={resultText}
                onChange={(e) => setResultText(e.target.value)}
              />
            </Col>
          </Row>
        </Card>
      </Col>
    </div>
  );
}

export default App;
