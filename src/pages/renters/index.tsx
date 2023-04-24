import { BlitzPage, Routes } from "@blitzjs/next"
import Layout from "../../core/layouts/Layout"
import { Suspense } from "react"
import { RentersTable } from "src/renters/components/renters-table"
import { PageLayout } from "../../core/layouts/page-layout"
import { useRouter } from "next/router"

const RentersPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <PageLayout
      heading={"Alle Mieter"}
      buttonActions={{
        primaryAction: {
          label: "Mieter anlegen",
          onClick: () => router.push(Routes.NewRenterPage()),
        },
        secondaryAction: {
          label: "Zurück",
          onClick: () => router.push(Routes.Home()),
        },
      }}
    >
      <Suspense fallback={"Loading..."}>
        <RentersTable />
      </Suspense>
    </PageLayout>
  )
}

RentersPage.getLayout = (page) => <Layout>{page}</Layout>
export default RentersPage
