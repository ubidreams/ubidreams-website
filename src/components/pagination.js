import Pagination from 'rc-pagination'

export const PaginationComponent = ({ posts = [], current = 1, onChange }) => {
  const itemRender = (current, type, element) => {
    if (type === 'page') {
      return (
        <a className='text-green' href={`#${current}`}>
          {current}
        </a>
      )
    }
    return element
  }

  return (
    <Pagination
      total={posts.length}
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
