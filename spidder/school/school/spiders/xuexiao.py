from scrapy import Spider
from scrapy.http.request import Request

from scrapy.selector import Selector
from school.items import SchoolItem
import urlparse

class DmozSpider(Spider):
	name = "xuexiao"
	allowed_domains = ["xuexiao.51sxue.com"]
	start_urls = [
		"http://xuexiao.51sxue.com/slist/?o=&t=&areaCodeS=3501&level=&sp=&score=&order=&areaS=%B8%A3%D6%DD%CA%D0&searchKey=",
	]

	def getItem(self, school):
		item = SchoolItem()
		logo = school.xpath('div/div[contains(@class,"school_m_img fl")]/a/img/@src').extract()
		item['logo'] = logo[0] if logo else "" 

		#name province city area under school_m_main
		school_main = school.xpath('div/div[contains(@class,"school_m_main fl")]')
		name  = school_main.xpath('li/h3/a/text()').extract()
		item["name"] = name[0] if name else ""
		item['province'] = ""
		item['city'] = ""
		item['area'] = ""
		tempLocation = school_main.xpath('li[2]/b/text()').extract()
		if tempLocation:
			location = tempLocation[0].split()
			item['province'] = location[0] if len(location) > 0 else ""
			item['city'] = location[1] if len(location) > 1 else "" 
			item['area'] = location[2] if len(location) > 2 else ""
		
		level = school_main.xpath('li[3]/b/text()').extract()
		catagery = school_main.xpath('li[4]/ol[1]/b/text()').extract()
		schoolType = school_main.xpath('li[4]/ol[2]/b/text()').extract()
		item['level'] = level[0] if level else ""
		item['catagery'] = catagery[0] if catagery else ""
		item['schoolType'] = schoolType[0] if schoolType else ""

		#address and phone under school_m_lx
		addressAndPhone = school.xpath('ul[contains(@class,"school_m_lx")]')
		address = addressAndPhone.xpath('li[1]/b/text()').extract()
		item['address'] = address[0] if address else ""
		item['phone'] = addressAndPhone.xpath('li[2]/b/text()').extract()
		
		return item
		
	
	'''
	try to parse reviews on school detail page, but the reviews are generated with ajax and encryped, so currently will leave this alone
		#yield item
		schoolUrl = school_main.xpath('li/h3/a/@href').extract()[0]
		request = Request(schoolUrl,callback=self.parse_items)
		request.meta['item'] = item

	def parse_items(self, response):
		sel = Selector(response)
		reviews = sel.xpath('//div[@id="school_main"]/div[@class="school_main_l fl"]/div[@style="width:700px;"]/div/div[@class="school_pl_list"]/div[@id="shuchu"]').extract()
		item = response.meta['item']
		item['reviews'] = reviews
		return item
'''   

   	def parse(self, response):
		sel = Selector(response)
		schools = sel.xpath('//div[@class="reply_box"]')
		for school in schools:
			item = self.getItem(school)
			yield item
		tempLinks = sel.xpath('//a[@class="down"]/@href').extract() 
		links = [x.encode('ascii','ignore') for x in tempLinks]
		
		nextpages = [page for page in links if ('&page=' in page)]
		if nextpages:
			for nextpage in nextpages:

				yield Request(urlparse.urljoin(self.start_urls[0], nextpage), callback=self.parse)
	
