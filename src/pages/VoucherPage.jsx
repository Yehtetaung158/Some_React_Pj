import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import Container from '../components/Container'
import VoucherList from '../components/VoucherList'
import VoucherDetailPage from './VoucherDetailPage'

const VoucherPage = () => {
  return (
    <section>
    <Container>
      <BreadCrumb currentPage={"Voucher"} />
      <VoucherList/>
    </Container>
  </section>
  )
}

export default VoucherPage