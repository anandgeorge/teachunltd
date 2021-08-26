import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const Paginate = ({ pages, page, isAdmin = false, isTutor = false, keyword = '', id = ''}) => {
  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin ? 
                !isTutor ? 
                  keyword && id ? 
                    `/search/${keyword}/page/${x + 1}/id/${id}` 
                  : keyword && !id ? 
                    `/search/${keyword}/page/${x + 1}` 
                  : !keyword && id ? 
                    `/search/page/${x + 1}/id/${id}` 
                  : `/page/${x + 1}` 
                : `/tutor/courses/${x + 1}` 
              : `/admin/courses/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
