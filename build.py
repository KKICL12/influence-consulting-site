#!/usr/bin/env python3
"""Build pages for the Influence Consulting site from content + a shared shell."""
import os

HEAD = """<!DOCTYPE html>
<html lang="en-NZ">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<meta name="description" content="{desc}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="style.css">
</head>
<body>

<header class="site-header">
  <div class="wrap nav-row">
    <a class="brand" href="index.html">Influence<span>Consulting</span></a>
    <nav>
      <a href="programmes.html">Programmes</a>
      <a href="our-people.html">Our People</a>
      <a href="success-stories.html">Success Stories</a>
      <a href="contact.html" class="btn btn-sm">Talk to us</a>
    </nav>
  </div>
</header>
<main>{body}</main>

<footer class="site-footer">
  <div class="wrap footer-grid">
    <div>
      <a class="brand brand-light" href="index.html">Influence<span>Consulting</span></a>
      <p class="footer-tag">Influencing skills specialists.</p>
    </div>
    <div>
      <h4>Contact</h4>
      <p><a href="mailto:enquire@influenceconsulting.biz">enquire@influenceconsulting.biz</a><br>
      <a href="tel:+6493030430">+64 9 303 0430</a></p>
    </div>
    <div>
      <h4>Explore</h4>
      <p><a href="programmes.html">Programmes</a><br>
      <a href="our-people.html">Our People</a><br>
      <a href="success-stories.html">Success Stories</a><br>
      <a href="contact.html">Contact</a></p>
    </div>
  </div>
  <div class="wrap footer-base">© 2026 Influence Consulting Limited. All rights reserved.</div>
</footer>

</body>
</html>
"""

def page(hero_title, hero_sub, body, title, desc):
    hero = f"""<section class="hero hero-sub"><div class="wrap"><p class="eyebrow">Influence Consulting</p>
    <h1 style="max-width:20ch">{hero_title}</h1><p class="lede">{hero_sub}</p></div></section>"""
    return HEAD.format(title=title, desc=desc, body=hero + body)

PEOPLE = [
 ("Kerry Kirton","Auckland, New Zealand","Kerry established Influence Consulting and runs the company as managing director. He has developed relationships with major clients across the Asia Pacific region for many years, and is considered a trusted and strategic advisor who makes meaningful contributions to their organisational goals. His experience, creativity and business acumen mean he is able to tailor solutions that best suit his clients' needs. Kerry holds degrees in law and commerce and practiced as a corporate lawyer for many years prior to establishing Influence Consulting."),
 ("James Burkitt","Wellington, New Zealand","James is a director of Influence Consulting. He regularly leads workshops and coaches individuals, both in New Zealand and internationally, in the area of face-to-face communication skills. He works with professionals with frontline business development responsibilities from a wide range of professional service firms. Prior to joining Influence Consulting in 2004, James worked as a lawyer for 10 years, including stints in London, Singapore and Thailand. In his last legal role, he established and built the corporate practice for an international firm in Thailand. This real-world experience ensures that his coaching is relevant, credible and practical. James holds a law degree."),
 ("Duncan Ashford","Queenstown, New Zealand","Duncan is passionate about improving business performance and personal success through behavioural change. He provides coaching and training on all aspects of influencing and communication skills, including presentation and relationship selling skills. With over 25 years' experience in senior Sales, Relationship Management and Learning & Development roles with global financial institutions, he understands regional and cultural nuances, having worked in the UK, USA, Hong Kong, China, Singapore, Thailand, Australia and New Zealand. Duncan holds a Bachelor of Arts degree from London University."),
 ("Kate Peterson","Christchurch, New Zealand","Kate has worked across a variety of industries, developing skills in sales, operations, customer service, business management, HR and training — including roles with the Progressive Group, Lion Nathan, PGG Wrightson and Meridian Energy as General Manager of Culture and Change. The majority of her work is with leaders and their talented people — those who choose to ensure their investment in each other is maximised, without compromising what really matters to each of them."),
 ("John Gelagin","Sydney, Australia","John is a highly professional and experienced facilitator committed to delivering relevant and engaging training. Over the past 8 years he has worked with many hundreds of people, helping them to influence others, deliver engaging presentations and build business development skills. Before joining Influence, John practised law for 8 years with firms in Australia and the UK and spent 5 years with an international publishing company in management roles. John holds a science and law degree."),
 ("David Lennane","Melbourne, Australia","David has coached in the area of communication and influencing skills for over 20 years. He assists clients across Australia and New Zealand from his Melbourne base, helping groups and individuals prepare, rehearse and deliver content in critical influencing situations. He specialises in coaching for in-house teams within large organisations, client conversations, and high-stakes bid and tender presentations. His background includes senior marketing and management roles at leading professional service firms and, before that, seven years as a PR consultant in New Zealand and the UK."),
 ("Abigail Vink","Wellington, New Zealand","Abigail is an experienced coach and facilitator with a particular focus on the public sector. She supports others as they reflect on their thinking and behavioural patterns and make positive changes to support their professional effectiveness. Abigail holds coaching credentials with the International Coaching Federation, the Institute of Executive Coaching and Leadership, and Strengths Network Aotearoa. She began her career in foreign policy and diplomacy and holds Bachelor of Laws and Bachelor of Arts (Chinese) degrees."),
 ("Susan Miller","Auckland, New Zealand","Susan is an experienced coach, facilitator and mediator having predominantly worked in the public health, community and legal sectors. She has spent the past 9 years dedicated to facilitating communications courses that have equipped people to influence their clients and colleagues for better work and life outcomes. Susan has a law degree, is a trained mediator and a licensed RTT practitioner."),
 ("Sarah Morton","Auckland, New Zealand","Sarah holds a Bachelor of Arts (Political Science), a Post Graduate Diploma in Drama (Auckland University) and LTCL Effective Speaking (Trinity College). An engaging facilitator, she has worked as a teacher and trainer for 30 years, the last 12 in business-based training, on leadership and business communication programmes for organisations such as Downer, Fisher & Paykel Healthcare, ADHB, Sistema and ETEL. In 2019 she received a “Highly Commended Champion Trainer” Award from Skills Highway."),
]

stories = [
 ("Private Sector · Banking","“Kerry’s session was absolutely fantastic! It was highly interactive, engaging, and incredibly interesting.”",
  """<p>Our client in the banking sector needed to develop their leaders' communication and influencing skills. With major changes happening in their sector, including shifts in technology use, it was crucial that leaders were able to effectively communicate and motivate their teams to embrace those changes.</p>
  <p>To address this need, we tailored our three core programmes — Be Clear, Engage &amp; Persuade, and Inspire — to the specific needs of our client. Participants attended the programmes based on their individual capabilities and needs, with some choosing to attend each programme gradually over time. Throughout the training, we ensured all participants focused on their specific influencing situations.</p>
  <p>Our client was able to point to key changes in the way their leaders communicated, resulting in buy-in to critical changes across the entire organisation.</p>"""),
 ("Private Sector · Infrastructure","“Thank you James. The team definitely found the course very helpful and interesting. They have expressed what a great coach you were for these few days.”",
  """<p>Our client is an owner/operator of significant infrastructure assets, as well as a number of additional businesses.</p>
  <p>Participants on our Influencing &amp; Stakeholder Engagement Skills programme are drawn from across the organisation — plant site engineering and operations, client contracting and sales, procurement and finance roles from head office, and everyone in between. Participants bring their own live, current situations into the programme, from discussions with suppliers, customers and regulators to internal propositions around capital allocation, compliance maturity and efficiency initiatives. Their situations are used as a platform to learn our proven concepts and techniques, and for application back in the workplace.</p>
  <p>We have delivered the programme across a range of locations for this client since 2014, and it is their top-ranking learning and development course based on staff feedback.</p>"""),
 ("Public Sector · Policy Implementation","“This workshop was fantastic! The content was really helpful for bringing consciousness to the way you interact with and influence people.”",
  """<p>A public sector client faced a critical challenge in implementing Government policy that required major behavioural change. They needed to develop their staff's influencing skills to effectively engage government agencies and the public — a critical requirement, since implementing government policy often requires coordination and cooperation across various agencies and stakeholders.</p>
  <p>Our core influencing skills programme was customised to meet the specific needs of the client, enabling participants to work on their own scenarios that required them to influence others to buy in to the proposed change. The programme provided skills including how to establish rapport with stakeholders, the use of persuasive communication techniques, and how to build consensus around the proposed change.</p>
  <p>Participants applied the skills they learned in their work to influence others for real buy-in to change, enabling the client to implement Government policy that required major behavioural change.</p>"""),
 ("Public Sector · Government Ministry","“I would definitely recommend this course to others — it's the most relevant and well-delivered piece of training I have undertaken for some time.” — Senior Manager",
  """<p>Our client is a significant Government Ministry with extensive policy, stakeholder engagement and operational responsibilities.</p>
  <p>We work with their external and overseas-facing staff, as well as senior professionals from across the organisation who need to influence others around strategic, policy, compliance, technical and safety-related scenarios. Staff participate in our flagship Influencing Skills programme, using our strategies and 7Cs skill sets for stakeholder engagement in situations from informal 1-1 meetings through to multi-party formal discussions.</p>
  <p>A recurring theme is the need to influence without the authority of legislation, policy or rules. Through strong working relationships, building credibility on topic, and presenting well-reasoned propositions while remaining alert to the specific needs of their stakeholders, participants gain much more traction. The programme has been run by the Ministry since 2015, with a long waiting list.</p>"""),
 ("Professional Services · Business Development","“No wonder we are hitting our targets! Thanks to James for his transforming work with us.” — Finance Director",
  """<p>Our client is an overseas consultancy firm with global reach — a large number of consultants who are technically excellent and deliver outstanding projects, but are also required to develop new business.</p>
  <p>This presents challenges: reticence around feeling 'salesy', difficulties articulating the value the firm can bring, and taking a long-term, consistent approach to developing business while managing the demands of client work.</p>
  <p>Through a firm-wide programme of workshops and ongoing coaching, in person and via video, we introduced a clear and reliable methodology for developing new business based on precise client understanding, clear articulation of value, and building strong working chemistry with clients, contacts and champions. The consultants are now much more comfortable and confident with business development, with a higher rate of success in winning new business.</p>"""),
 ("Professional Services · Presentation Skills","“I attended the course to prepare for a high-stakes presentation. The audience feedback was that I was very polished, with great synergy and engagement from our audience.” — Senior Advisor",
  """<p>Our client is a leading professional service firm with challenges around the presentation of very technical concepts and information, pressured timeframes for preparation, and demanding audiences.</p>
  <p>Through our presentation skills programme, advisors work through the key elements of preparing interesting and engaging content, structuring for clarity, and delivering with confidence and conviction. The programme is a mix of group workshop and 1-1 coaching sessions.</p>
  <p>We regularly receive participant comments that this has been the best training they have ever attended. As a result, we have been engaged by the firm continuously over the last 15 years to develop the face-to-face communication skills of their client-facing staff.</p>"""),
]

# programmes page
prog_cards = [
 ("Influential Adviser — Business Development Skills","Programmes designed for the banking, financial or professional service sectors, that result in more business with existing and prospective clients."),
 ("Influential Adviser — Consulting Skills","Programmes that help banking, financial or professional service consultants develop key communication skills that cement strategic client relationships."),
 ("Be Clear","Covers the fundamentals of communicating information clearly to ensure messages are easily understood."),
 ("Engage &amp; Persuade","Covers skills for engaging stakeholders and winning buy-in for initiatives that make a difference."),
 ("Inspire Change","Covers the art of compelling storytelling for people who need to articulate a new vision or strategy."),
]
prog_body = """<section class="section"><div class="wrap">
<p class="eyebrow">Our programmes</p>
<h2>Tailored to your people and their situations.</h2>
<p class="lede">We deliver tailored influencing skills programmes consisting of small-group workshops and individual coaching sessions. Delivery can be a standalone workshop, a workshop series, workshops with follow-up coaching, or individual coaching sessions.</p>
<div class="grid-2" style="margin-top:40px">""" + "".join(
    f'<div class="card card-lg"><h3>{t}</h3><p>{d}</p></div>' for t,d in prog_cards
) + f"""</div>
<div style="margin-top:40px"><a class="btn" href="contact.html">Design a programme for your team</a></div>
</div></section>"""

# people page
people_body = """<section class="section"><div class="wrap">
<p class="eyebrow">Our facilitators</p>
<h2>Talented, respected facilitators.</h2>
<p class="lede">All our people are talented and respected facilitators who have enjoyed successful careers in a variety of sectors. They service clients from New Zealand and beyond.</p>
<div class="grid-3" style="margin-top:40px">""" + "".join(
    f'<div class="person"><h3>{n}</h3><p class="loc">{l}</p><p>{b}</p></div>' for n,l,b in PEOPLE
) + """</div>
<div style="margin-top:40px"><a class="btn" href="contact.html">Talk to us</a></div>
</div></section>"""

# stories page
stories_body = """<section class="section"><div class="wrap">
<p class="eyebrow">Client feedback</p>
<h2>Some success stories.</h2>
<p class="lede">Our practical training programmes result in a real return on client investment.</p>
<div style="margin-top:40px">""" + "".join(
    f'<details class="story"><summary><span class="tag">{t}</span><h3>{q}</h3></summary><div class="story-body">{b}</div></details>'
    for t,q,b in stories
) + """</div>
<div style="margin-top:40px"><a class="btn" href="contact.html">Talk to us</a></div>
</div></section>"""

# contact page
contact_body = """<section class="section"><div class="wrap contact-grid">
<div>
  <p class="eyebrow">Talk to us</p>
  <h2>Let's design the right programme.</h2>
  <p>Get in touch to find out how our tailored influencing skills programmes can help you and your organisation. We'll start with your goals and the situations your people face.</p>
  <ul class="checklist" style="margin-top:28px">
    <li>Programmes for small groups and individuals</li>
    <li>Workshops, series, and follow-up coaching</li>
    <li>Delivery across New Zealand, Australia and Asia-Pacific</li>
  </ul>
</div>
<div class="contact-card">
  <h3>Our contact</h3>
  <p style="color:#b8c2d4;margin:18px 0 6px">Email</p>
  <a href="mailto:enquire@influenceconsulting.biz">enquire@influenceconsulting.biz</a>
  <p style="color:#b8c2d4;margin:28px 0 6px">Phone</p>
  <a href="tel:+6493030430">+64 9 303 0430</a>
</div>
</div></section>"""

os.makedirs("_out", exist_ok=True)
pages = {
 "programmes.html": page("Our programmes", "Small-group workshops and individual coaching, tailored to your sector and your people's real influencing situations.", prog_body, "Programmes — Influence Consulting", "Tailored influencing skills programmes of small-group workshops and individual coaching sessions."),
 "our-people.html": page("Our people", "All our people are talented and respected facilitators who have enjoyed successful careers in a variety of sectors.", people_body, "Our People — Influence Consulting", "Meet the facilitators of Influence Consulting."),
 "success-stories.html": page("Success stories", "Our practical training programmes result in a real return on client investment.", stories_body, "Success Stories — Influence Consulting", "Success stories from Influence Consulting's influencing skills programmes."),
 "contact.html": page("Talk to us", "Get in touch to find out how our tailored influencing skills programmes can help you and your organisation.", contact_body, "Contact — Influence Consulting", "Contact Influence Consulting — influencing skills specialists."),
}
for name, html_ in pages.items():
    open(os.path.join("_out", name), "w").write(html_)
    print("wrote", name, len(html_))
