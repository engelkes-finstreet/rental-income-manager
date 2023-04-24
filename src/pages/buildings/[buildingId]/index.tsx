import { Suspense } from "react"
import { RentersStatusList } from "../../../renters/components/renters-status-list"
import { BlitzPage, Routes, useParam } from "@blitzjs/next"
import Layout from "../../../core/layouts/Layout"
import { PageLayout } from "../../../core/layouts/page-layout"
import { useQuery } from "@blitzjs/rpc"
import getBuilding from "../../../buildings/queries/get-building"
import { getBuildingName } from "src/core/models/building"
import { useRouter } from "next/router"

const BuildingDetailPage: BlitzPage = () => {
  const buildingId = useParam("buildingId", "number")
  const [building] = useQuery(getBuilding, { id: buildingId!! })
  const router = useRouter()

  return (
    <PageLayout
      heading={getBuildingName(building)}
      buttonActions={{
        primaryAction: {
          label: "Gebäude bearbeiten",
          onClick: () => router.push(Routes.EditBuildingPage({ buildingId: buildingId!! })),
        },
        secondaryAction: {
          label: "Zurück",
          onClick: () => router.push(Routes.BuildingsPage()),
        },
      }}
    >
      <Suspense fallback={"Loading..."}>
        <RentersStatusList />
      </Suspense>
    </PageLayout>
  )
}

BuildingDetailPage.getLayout = (page) => <Layout>{page}</Layout>
export default BuildingDetailPage
