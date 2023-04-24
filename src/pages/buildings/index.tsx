import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "../../core/layouts/Layout"
import { BuildingsTable } from "../../buildings/components/buildings-table"
import { Suspense } from "react"
import { PageLayout } from "../../core/layouts/page-layout"
import { useRouter } from "next/router"

const BuildingsPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <PageLayout
      heading={"Alle Gebäude"}
      buttonActions={{
        primaryAction: {
          label: "Gebäude anlegen",
          onClick: () => router.push(Routes.NewBuildingPage()),
        },
      }}
    >
      <Suspense fallback={"Loading..."}>
        <BuildingsTable />
      </Suspense>
    </PageLayout>
  )
}

BuildingsPage.getLayout = (page) => <Layout>{page}</Layout>

export default BuildingsPage
