export async function GET() {

  return new Response(
    `<h1>api/users</h1>`,
    {
      headers: {
        'Content-Type': "text/html"
      }
    }
  )
  
}