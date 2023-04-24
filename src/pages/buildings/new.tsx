import { NewBuildingForm } from "../../buildings/components/building-form"
import Layout from "../../core/layouts/Layout"

const NewBuildingPage = () => {
  return <NewBuildingForm />
}

NewBuildingPage.getLayout = (page) => <Layout>{page}</Layout>
export default NewBuildingPage
