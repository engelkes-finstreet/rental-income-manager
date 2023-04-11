import { NewRenterForm } from "src/renters/components/new-renter-form"
import Layout from "../../core/layouts/Layout"

const NewRenterPage = () => {
  return <NewRenterForm />
}

NewRenterPage.getLayout = (page) => <Layout>{page}</Layout>
export default NewRenterPage
