import Pagination from 'rc-pagination'

export const PaginationComponent = ({ data = [], current = 1, onChange }) => {
  const itemRender = (current, type, element) => {
    if (type === 'page') {
      return (
        <a className='text-black' href={`#${current}`}>
          {current}
        </a>
      )
    }
    return element
  }

  return (
    <Pagination
      total={data.length}
      defaultPageSize={6}
      onChange={onChange}
      itemRender={itemRender}
      showPrevNextJumpers={false}
      current={current}
      hideOnSinglePage={true}
    />
  )
}

export default PaginationComponent
