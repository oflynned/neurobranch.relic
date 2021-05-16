# Neurobranch 2016

### What is this repo?

Neurobranch was a failed attempt at creating a multiplatform clinical trials app to allow regular people to find and participate in clinical trials more easily. Neurobranch was an entry into Launchbox 2016 and received partial funding to participate.

It's a relic of the time and has been slightly refactored to run easily in 2021.

### Quickstart

Back in 2016:
- Install MongoDB (unknown version) locally and run it using systemd
- Install Redis (unknown version) locally and run it using systemd
- Run `npm install` on the repo to generate a lockfile
- Run `node app.js` in the repo to actually start the server

Now:
- Install docker locally
- Run `docker-compose up`

### What went wrong?

A lot of small things built up to become a huge problem when trying to deliver the software project.

#### :hourglass_flowing_sand:  Project management

- No branching strategy

Everything was committed to master instead of creating branches for features, chores, refactors, fixes.
This created conflicts and made the process of documenting the development process much more difficult.

- Not understanding the client's needs

We had a client who was in mind to use Neurobranch, but we did not keep contact at all.
We didn't understand their needs well enough, and so when the end of the project came around; they didn't understand the product.
Over time what we understood diverged from what they actually needed.
The net result was a confused person and a wasted summer.

- Methodology

We did not define work first and break it down into tickets.
We wrote some tasks down in Google Drive and assumed it was well enough understood.
We did not use fully defined tickets or Jira, and so work dragged on - inevitably blocked.
We did not hold any level of daily standup or accountability to alleviate issues encountered.

- No designer

A lack of a designer meant that the design was created as we went and did not consider usability at any point.
It was difficult to use and was a frustrating experience from every angle.
  
- Code it and they will come

We did not have enough connections and industry knowledge to understand the client first before creating any form of solution.
What we should have done is to reach out to people involved in the industry on LinkedIn, try to understand them, create a high fidelity mockup in Adobe XD/Sketch/Figma, and only then create a real solution.
By jumping straight in, we shot ourselves in the foot.

- Ethics

"Clinical trials will be cool! Let's aggregate some relevant info from a wearable!". On the surface, this is an interesting idea; right?
Trials need information, participants can lie, but their wearables give a lot of information about them.
Once you dig into this idea, this is a very grey area around the collection of personal metrics.
For example, how long will this data be collected for?
Will you have my location data?
What about if you get hacked?
How don't I know that you will target me with ads?
Can I opt out?
Will you delete my data if I request so?

#### :money_mouth_face: Big Bizness

- Lack of focus

Our intentions were valiant, but ultimately came up short as we did not know what we wanted our project to be.
The project at one point had a newsfeed, then ended up collating trial information for interested people to join.

What we didn't consider is that the information collected and how it's presented are more important than digitising the process of joining a trial.
We did not understand the need to visualise data, or regulations involved when a trial commences.
A candidate generally continues to visit their doctor on a regular basis and does not receive additional treatment for partaking in a trial.

- Metrics

We had no idea who was using our platform, any metadata about them, and nothing we could gauge.

- Reinventing the wheel
  
Rather than reimplementing authentication, we should have used a pre-existing solution to save some time.

- Seed money

We were given about 3K euro to build this solution, but we did not come up with a plan to use it effectively.
Hire contractors? Nope.
How will we make money from this? Should we create some pricing strategies? No.
Buy some hardware to aid development? Nah.
How about discovering customers? No.

#### :skull_and_crossbones: Quality

- Hype train

We jumped on the latest hype train (Express, Node.js, MongoDB) instead of using older technologies to create a solution quickly and effectively. 
We chose Express because some Medium articles recommended it. 
We chose MongoDB because 2015 had a strange love for Node.js simply because of JSON.
What we should have gone for is an opinionated framework and create some in-depth documents first to go through real data models.

If we had done that, then we might have discovered that MongoDB is not the best for data where relationships actually carry some value. 
We might have also discovered that issues with asynchronous programming could be alleviated by using something other than ES2015 Javascript, but by then we were a third of the way to the deadline.

- Unopinionated framework

We chose Express at the underlying framework after reading a lot of articles about the latest & greatest frameworks in 2016. 
What we didn't take into account was the fact of time taken to become proficient in a new language or how much guidance a group of 3 young engineers actually needed. 
A much better option would be to have gone for another more _opinionated_ framework such as Rails/Django for quick development, or use something like Spring to stay with a Java background.

- No tests or testing strategy

We had heard of the concept of _testing_ software, but we failed to understand what it actually entails.
By using an opinionated framework and writing some unit tests, we could have understood the structural issues with our code that plagued every aspect of development.

Even without that, we should have realised that writing testing scripts in Python led to anything being persisted in the database since no validation was done.
It's a positive thing that this was never used in production because the countless issues would have led to a leak or data loss.

- Reproducible builds

Docker wasn't a thing for reproducible builds in GlassByte.
Neither was Docker Compose.
Or including dependency package locks.
Or even including versions.
Most packages were `latest` or `*`.

#### :baby: Inexperience

Clients could send anything to the API and it would be persisted to the database without question.
By jumping on the hype train of MongoDB, we didn't realise that these restrictions of schema actually provide some value.

The DB was placed directly on the EC2 instance, no backups were ever taken.

We did not sanitise _anything_ from the client. If you inspected the API call, you could send any payload and it would be persisted to the DB.

First time creating an api, web development

No understanding of CSS

SOLID was not a thing we understood

Two codebases in two different languages when we could have just stuck with webdev until there was a reason for an app.
Perhaps it was a sign of the times? Apps were all the hype and web was less interesting.

Didn't create a design system or take time to create actual mockups first

Back in 2016, this was pretty much one giant 1000 line long mega-file, but was refactored for the first time at the start of 2017 as it was still unfinished.

In order to publish a new build, one of us had to manually SSH into the EC2 server to pull it with your Git credentials.
Only then could you manually restart it.
