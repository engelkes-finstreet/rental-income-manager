import { BlitzPage } from "@blitzjs/next"
import Layout from "../../core/layouts/Layout"
import { Suspense } from "react"
import { RentersTable } from "src/renters/components/renters-table"

const RentersPage: BlitzPage = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <RentersTable />
    </Suspense>
  )
}

RentersPage.getLayout = (page) => <Layout>{page}</Layout>
export default RentersPage
