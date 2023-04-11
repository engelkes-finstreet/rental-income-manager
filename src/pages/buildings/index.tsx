import { BlitzPage } from "@blitzjs/next"
import Layout from "../../core/layouts/Layout"
import { BuildingsTable } from "../../buildings/components/buildings-table"
import { Suspense } from "react"

const BuildingsPage: BlitzPage = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <BuildingsTable />
    </Suspense>
  )
}

BuildingsPage.getLayout = (page) => <Layout>{page}</Layout>

export default BuildingsPage
