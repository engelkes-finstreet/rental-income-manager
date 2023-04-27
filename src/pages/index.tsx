import { BlitzPage } from "@blitzjs/next"
import { Grid } from "@chakra-ui/react"
import Layout from "../core/layouts/Layout"
import { PageLayout } from "../core/layouts/page-layout"
import { useQuery } from "@blitzjs/rpc"
import getBuildingsWithRentInfo from "../buildings/queries/get-buildings-with-rent-info"
import BuildingCard from "src/buildings/components/building-card"

const Home: BlitzPage = () => {
  const [buildings] = useQuery(getBuildingsWithRentInfo, undefined)

  return (
    <PageLayout heading={"Dashboard"}>
      <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={6}>
        {buildings.map((building) => (
          <BuildingCard key={building.id} building={building} />
        ))}
      </Grid>
    </PageLayout>
  )
}

Home.getLayout = (page) => <Layout>{page}</Layout>
export default Home
