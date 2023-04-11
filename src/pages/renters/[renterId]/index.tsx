import { BlitzPage } from "@blitzjs/next"
import Layout from "../../../core/layouts/Layout"

const RenterDetailPage: BlitzPage = () => {
  return <div>RenterDetailPage</div>
}

RenterDetailPage.getLayout = (page) => <Layout>{page}</Layout>

export default RenterDetailPage
