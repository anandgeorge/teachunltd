import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords, url, image }) => {
  return (
    <Helmet>
      <meta property="og:locale" content="en_US" />
      <meta property="og:type" content="website" />
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keyword' content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url}></meta>
      <meta property="og:updated_time" content="2021-01-28T04:46:01+00:00" />
      <meta property="og:image" content={`https://app.teachun.ltd/${image}`}/>
      <meta property="og:image:secure_url" content={`https://app.teachun.ltd/${image}`}/>
      <meta property="og:image:alt" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title}/>
      <meta name="twitter:description" content={description}/>
      <meta name="twitter:site" content="@teachunltd" />
      <meta name="twitter:image" content={`https://app.teachun.ltd/${image}`} />
      <meta name="twitter:creator" content="@anandgeor" />
      <link rel="canonical" href={url}></link>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'TeachUnltd | Cohort Based Teaching Platform',
  description: 'TeachUnltd is a cohort based teaching platform that offers all the tools for conducting a class. It allows for sharing all types of media, collaboration and monetisation.',
  keywords: 'cohort, threads, teach, learn',
  url: 'https://app.teachun.ltd',
  image: 'teachunltd.png'
}

export default Meta




