import { Suspense } from "react"
import { RentersStatusList } from "../../../renters/components/renters-status-list"
import { BlitzPage } from "@blitzjs/next"
import Layout from "../../../core/layouts/Layout"

const BuildingDetailPage: BlitzPage = () => {
  return (
    <Suspense fallback={"Loading..."}>
      <RentersStatusList />
    </Suspense>
  )
}

BuildingDetailPage.getLayout = (page) => <Layout>{page}</Layout>
export default BuildingDetailPage
