import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Home() {
  const [getResponse, setGetResponse] = useState('');
  const [id, setId] = useState('');
  const [idResponse, setIdResponse] = useState('');
  const [input, setInput] = useState('');
  const [postResponse, setPostResponse] = useState('');
  const [isLoading, setIsLoading] = useState({
    get: false,
    id: false,
    post: false
  });

  const handleGetRequest = async () => {
    setIsLoading(prev => ({ ...prev, get: true }));
    try {
      const res = await fetch('https://tech0-gen-8-step3-testapp-py1-8.azurewebsites.net/api/hello');
      const data = await res.json();
      console.log("GETリクエストの結果:", data.message);
      setGetResponse(data.message);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, get: false }));
    }
  };

  const handleIdRequest = async (e) => {
    e.preventDefault();
    if (!id) return;
    
    setIsLoading(prev => ({ ...prev, id: true }));
    try {
      const res = await fetch(`https://tech0-gen-8-step3-testapp-py1-8.azurewebsites.net/api/multiply/${id}`);
      const data = await res.json();
      console.log("IDリクエストの結果:", data.doubled_value);
      setIdResponse(data.doubled_value);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, id: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;

    setIsLoading(prev => ({ ...prev, post: true }));
    try {
      const res = await fetch('https://tech0-gen-8-step3-testapp-py1-8.azurewebsites.net/api/echo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      console.log("Backendからのお返事:", data.message);
      setPostResponse(data.message);
    } catch (error) {
      console.error("エラーが発生しました:", error);
    } finally {
      setIsLoading(prev => ({ ...prev, post: false }));
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Next.jsとFlaskの連携アプリ</h1>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>シンプルなGETリクエスト</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleGetRequest}
              disabled={isLoading.get}
              className="w-full"
            >
              {isLoading.get ? "送信中..." : "GETリクエストを送信"}
            </Button>
            {getResponse && (
              <p className="mt-4 p-3 bg-slate-100 rounded-md">
                サーバーからの応答: {getResponse}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>IDを指定したGETリクエスト</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleIdRequest} className="space-y-4">
              <Input
                type="number"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="IDを入力してください"
              />
              <Button 
                type="submit"
                disabled={isLoading.id || !id}
                className="w-full"
              >
                {isLoading.id ? "送信中..." : "送信"}
              </Button>
            </form>
            {idResponse && (
              <p className="mt-4 p-3 bg-slate-100 rounded-md">
                Flaskからの応答: {idResponse}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>POSTリクエスト</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="テキストを入力してください"
              />
              <Button 
                type="submit"
                disabled={isLoading.post || !input}
                className="w-full"
              >
                {isLoading.post ? "送信中..." : (
                  <span className="flex items-center gap-2">
                    送信 <Send className="w-4 h-4" />
                  </span>
                )}
              </Button>
            </form>
            {postResponse && (
              <p className="mt-4 p-3 bg-slate-100 rounded-md">
                Flaskからの応答: {postResponse}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
