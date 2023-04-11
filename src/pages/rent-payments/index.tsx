import { BlitzPage } from "@blitzjs/next"
import Layout from "src/core/layouts/Layout"
import { NewRentPaymentForm } from "../../rent-payments/components/new-rent-payment-form"

const RentPaymentsPage: BlitzPage = () => {
  return <NewRentPaymentForm />
}

RentPaymentsPage.getLayout = (page) => <Layout>{page}</Layout>

export default RentPaymentsPage
