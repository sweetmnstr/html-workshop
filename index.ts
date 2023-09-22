import fs from 'fs/promises';

const baseUrl = 'http://localhost:3000/'
const formUrl = 'http://localhost:3000/form'

enum AvailableMethodsEnum {
    post = "POST",
    get = "GET"
}

const server = Bun.serve({
    port: 3000,
    async fetch(req, res) {
        if(assertBaseUrl(req.url)){
            if(assertMethods(req.method, AvailableMethodsEnum.get)) {
                const htmlFile= await fs.readFile('./my-html-workshop.html')
                const headers = { 'Content-Type': 'text/html' };
                return new Response(htmlFile, {headers});
            } 
        } else if(assertFormUrl(req.url)){
            if(assertMethods(req.method, AvailableMethodsEnum.get)) {
                const [_,queryParamsRaw] = req.url.split('?')
                const queryParams= queryParamsRaw.split('&')

                console.log({queryParams});
            } else if(assertMethods(req.method, AvailableMethodsEnum.post)) { 
                console.log(req.body);
                
                return new Response(req.body);
            }
        }
        
        return new Response('Not Found', { status: 404 });
    },
    
  });

  function assertBaseUrl(url: string) {
    return url === baseUrl
  }

  function assertFormUrl(url: string) {
    return url.includes(formUrl)
  }

  function assertMethods(reqMethod: string, method: string) {
    return reqMethod === method
  }
  
  console.log(`Listening on http://localhost:${server.port} ...`);