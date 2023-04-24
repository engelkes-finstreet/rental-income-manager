import { BlitzPage, useParam } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import getBuilding from "src/buildings/queries/get-building"
import { getBuildingName } from "src/core/models/building"
import { PageLayout } from "../../../core/layouts/page-layout"
import { EditBuildingForm } from "../../../buildings/components/building-form"
import Layout from "src/core/layouts/Layout"

const EditBuildingPage: BlitzPage = () => {
  const buildingId = useParam("buildingId", "number")
  const [building] = useQuery(getBuilding, { id: buildingId!! })
  const router = useRouter()

  return (
    <PageLayout heading={`Gebäude ${getBuildingName(building)} bearbeiten`}>
      <EditBuildingForm building={building} />
    </PageLayout>
  )
}

EditBuildingPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditBuildingPage
