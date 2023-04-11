import Layout from "src/core/layouts/Layout"
import { Routes, BlitzPage } from "@blitzjs/next"
import { Button } from "@chakra-ui/react"

const Home: BlitzPage = () => {
  return (
    <Layout title="Home">
      <Button variant={"primary"}>Test</Button>
    </Layout>
  )
}

export default Home
