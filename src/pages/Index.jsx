import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const Index = () => {
  const [url, setUrl] = useState("");
  const [relatedDomains, setRelatedDomains] = useState([]);
  const [selectedDomains, setSelectedDomains] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);

  const handleUrlSubmit = async () => {
    // Fetch related domains from the backend
    const domains = await fetchRelatedDomains(url);
    setRelatedDomains(domains);
  };

  const handleChatSubmit = async () => {
    // Send chat input to the backend and get response
    const response = await fetchChatResponse(chatInput, selectedDomains);
    setChatHistory([...chatHistory, { input: chatInput, response }]);
    setChatInput("");
  };

  const fetchRelatedDomains = async (url) => {
    // Mock function to simulate fetching related domains
    return ["example.com", "example.org", "example.net"];
  };

  const fetchChatResponse = async (input, domains) => {
    // Mock function to simulate fetching chat response
    return "This is a mock response based on the selected domains.";
  };

  const toggleDomainSelection = (domain) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Enter URL</CardTitle>
        </CardHeader>
        <CardContent>
          <Input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter a URL"
          />
          <Button onClick={handleUrlSubmit} className="mt-2">
            Retrieve Related Domains
          </Button>
        </CardContent>
      </Card>

      {relatedDomains.length > 0 && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Select Related Domains</CardTitle>
          </CardHeader>
          <CardContent>
            {relatedDomains.map((domain) => (
              <div key={domain} className="flex items-center space-x-2">
                <Checkbox
                  id={domain}
                  checked={selectedDomains.includes(domain)}
                  onCheckedChange={() => toggleDomainSelection(domain)}
                />
                <Label htmlFor={domain}>{domain}</Label>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Chat with LLM</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder="Ask something..."
          />
          <Button onClick={handleChatSubmit} className="mt-2">
            Send
          </Button>
          <div className="mt-4">
            {chatHistory.map((chat, index) => (
              <div key={index} className="mb-2">
                <p><strong>You:</strong> {chat.input}</p>
                <p><strong>LLM:</strong> {chat.response}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;