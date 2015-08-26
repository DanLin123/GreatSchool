from scrapy.spiders import Spider
from scrapy.selector import Selector
from school.items import SchoolItem


class DmozSpider(Spider):
    name = "xuexiao"
    allowed_domains = ["dmoz.org"]
    start_urls = [
        "http://xuexiao.51sxue.com/slist/"    ]

    def parse(self, response):
        """
        The lines below is a spider contract. For more info see:
    
        @url http://www.dmoz.org/Computers/Programming/Languages/Python/Resources/
        @scrapes name
        """
        sel = Selector(response)
        schools = sel.xpath('//div[@class="reply_box"]')

        items = []

        for school in schools:
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
            item['reviews'] = school_main.xpath('li[2]/b/text()').extract()
          
            items.append(item)

        return items


